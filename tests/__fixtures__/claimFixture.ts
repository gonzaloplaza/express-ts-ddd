import { Claim } from '../../src/api/infrastructure/authentication/cognito/CognitoJwtVerifier';

export const claimFixture = (props: Partial<Claim> = {}): Claim => {
  const defaultClaim = {
    token_use: 'access',
    auth_time: 4,
    iss: `https://cognito-idp.test-central-1.amazonaws.com/testCognitoPool`,
    exp: 3,
    username: '',
    client_id: ''
  };

  return { ...defaultClaim, ...props };
};
