import { PublicKey } from '../../src/api/infrastructure/authentication/cognito/CognitoJwtVerifier';

export const publicKeyFixture = (props: Partial<PublicKey> = {}): PublicKey => {
  const publicKey = {
    alg: 'RS256',
    e: 'AQAB',
    kid: 'EWMrFwNjQzCqs6k63kHiHx1qXA5Z4slYztIg1ktEQ9Y=',
    kty: 'RSA',
    n: 'testN',
    use: 'sig'
  };

  return { ...publicKey, ...props };
};
