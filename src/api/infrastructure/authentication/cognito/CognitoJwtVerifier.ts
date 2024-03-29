import axios from 'axios';
import jsonwebtoken from 'jsonwebtoken';
import { getCurrentSeconds } from '../../../../shared/infrastructure/date';
import { Configuration } from '../../../../../config';

// Warning: DO NOT use @types/jwk-to-pem or import for this package.
// DO NOT remove this eslint-disbable comment.
// Copied from: https://github.com/awslabs/aws-support-tools/tree/master/Cognito/decode-verify-jwt

// eslint-disable-next-line @typescript-eslint/no-var-requires
const jwkToPem = require('jwk-to-pem');

export interface ClaimVerifyRequest {
  readonly token: string;
}

export interface ClaimVerifyResult {
  readonly userName: string;
  readonly clientId: string;
  readonly isValid: boolean;
  readonly error?: any;
}

interface TokenHeader {
  kid: string;
  alg: string;
}

export interface PublicKey {
  alg: string;
  e: string;
  kid: string;
  kty: string;
  n: string;
  use: string;
}

interface PublicKeyMeta {
  instance: PublicKey;
  pem: string;
}

export interface PublicKeys {
  keys: PublicKey[];
}

interface MapOfKidToPublicKey {
  [key: string]: PublicKeyMeta;
}

export interface Claim {
  token_use: string;
  auth_time: number;
  iss: string;
  exp: number;
  username: string;
  client_id: string;
}

export class CognitoJwtVerifier {
  private readonly cognitoIssuer: string;
  private cacheKeys: MapOfKidToPublicKey | undefined;

  constructor(private config: Configuration) {
    this.cognitoIssuer = `https://cognito-idp.${this.config.APP_COGNITO.REGION}.amazonaws.com/${this.config.APP_COGNITO.USER_POOL_ID}`;
  }

  public async verify(token: string): Promise<ClaimVerifyResult> {
    const request: ClaimVerifyRequest = {
      token: token
    };

    let result: ClaimVerifyResult;
    let error = undefined;

    try {
      const token = request.token;
      const tokenSections = (token || '').split('.');
      if (tokenSections.length < 2) {
        error = 'Invalid JWT token';
      }
      const headerJSON = Buffer.from(tokenSections[0], 'base64').toString('utf8');
      const header = JSON.parse(headerJSON) as TokenHeader;
      const keys = await this.getPublicKeys();
      const key = keys[header.kid];
      if (key === undefined) {
        error = 'Claim made for unknown kid';
      }

      const claim = (await jsonwebtoken.verify(token, key.pem)) as Claim;
      const currentSeconds = getCurrentSeconds();
      if (currentSeconds > claim.exp || currentSeconds < claim.auth_time) {
        error = 'Claim is expired or invalid';
      }
      if (claim.iss !== this.cognitoIssuer) {
        error = 'Claim issuer is invalid';
      }
      if (claim.token_use !== 'access') {
        error = 'Claim use is not access';
      }

      if (!error) {
        result = { userName: claim.username, clientId: claim.client_id, isValid: true };
      } else {
        result = { userName: '', clientId: '', error, isValid: false };
      }
    } catch (error: any) {
      result = { userName: '', clientId: '', error: error.message, isValid: false };
    }

    return result;
  }

  private getPublicKeys = async (): Promise<MapOfKidToPublicKey> => {
    if (!this.cacheKeys) {
      const publicKeys = await axios.get<PublicKeys>(`${this.cognitoIssuer}/.well-known/jwks.json`);

      this.cacheKeys = publicKeys.data.keys.reduce((agg, current) => {
        const pem = jwkToPem(current);
        agg[current.kid] = { instance: current, pem };
        return agg;
      }, {} as MapOfKidToPublicKey);

      return this.cacheKeys;
    } else {
      return this.cacheKeys;
    }
  };
}
