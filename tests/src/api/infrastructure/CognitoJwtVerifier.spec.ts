import { CognitoJwtVerifier } from '../../../../src/api/infrastructure/authentication/cognito/CognitoJwtVerifier';
import { config } from '../../../../config';

const cognitoJwtVerifier = new CognitoJwtVerifier(
  config.APP_COGNITO.USER_POOL_ID,
  config.APP_COGNITO.REGION
);

describe('CognitoJwtVerifier', () => {
  it('should not verify an invalid cognito jwt token', async () => {
    const jwt = 'invalidJwtToken';
    const jwtVerification = await cognitoJwtVerifier.verify(jwt);
    expect(jwtVerification.isValid).toBeFalsy();
  });

  it('should not verify an empty cognito jwt token', async () => {
    const jwt = '';
    const jwtVerification = await cognitoJwtVerifier.verify(jwt);
    expect(jwtVerification.isValid).toBeFalsy();
  });
});
