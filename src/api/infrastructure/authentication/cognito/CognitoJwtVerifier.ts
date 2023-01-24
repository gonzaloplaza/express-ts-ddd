import axios from 'axios';
import jsonwebtoken from 'jsonwebtoken';

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

interface PublicKey {
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

interface PublicKeys {
  keys: PublicKey[];
}

interface MapOfKidToPublicKey {
  [key: string]: PublicKeyMeta;
}

interface Claim {
  token_use: string;
  auth_time: number;
  iss: string;
  exp: number;
  username: string;
  client_id: string;
}

export class CognitoJwtVerifier {
  private cognitoIssuer: string;
  private cacheKeys: MapOfKidToPublicKey | undefined;

  constructor(private cognitoUserPoolId: string, private cognitoRegion: string) {
    if (!cognitoUserPoolId || !cognitoRegion) {
      throw new Error('Valid CognitoUserPoolId and CognitoRegion are required.');
    }

    this.cognitoIssuer = `https://cognito-idp.${this.cognitoRegion}.amazonaws.com/${this.cognitoUserPoolId}`;
  }

  public async verify(token: string): Promise<ClaimVerifyResult> {
    const request: ClaimVerifyRequest = {
      token: token
    };

    let result: ClaimVerifyResult;

    try {
      const token = request.token;
      const tokenSections = (token || '').split('.');
      if (tokenSections.length < 2) {
        throw new Error('Invalid JWT token');
      }
      const headerJSON = Buffer.from(tokenSections[0], 'base64').toString('utf8');
      const header = JSON.parse(headerJSON) as TokenHeader;
      const keys = await this.getPublicKeys();
      const key = keys[header.kid];
      if (key === undefined) {
        throw new Error('Claim made for unknown kid');
      }

      const claim = (await jsonwebtoken.verify(token, key.pem)) as Claim;
      const currentSeconds = Math.floor(new Date().valueOf() / 1000);
      if (currentSeconds > claim.exp || currentSeconds < claim.auth_time) {
        throw new Error('Claim is expired or invalid');
      }
      if (claim.iss !== this.cognitoIssuer) {
        throw new Error('Claim issuer is invalid');
      }
      if (claim.token_use !== 'access') {
        throw new Error('Claim use is not access');
      }
      result = { userName: claim.username, clientId: claim.client_id, isValid: true };
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
