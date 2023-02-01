import { CognitoJwtVerifier } from '../../../../../../src/api/infrastructure/authentication/cognito/CognitoJwtVerifier';
import { config } from '../../../../../../config';
import * as dateService from '../../../../../../src/shared/infrastructure/date';
import { jwtFixture } from '../../../../../__fixtures__/jwtFixture';
import { claimFixture } from '../../../../../__fixtures__/claimFixture';
import { publicKeyFixture } from '../../../../../__fixtures__/publicKeyFixture';

const mockedAxiosGet = jest.fn();
const mockedClaim = jest.fn();
jest.mock('axios', () => ({ get: () => mockedAxiosGet() }));
jest.mock('jsonwebtoken', () => {
  const actual = jest.requireActual('jsonwebtoken'); // Step 2.
  return {
    ...actual,
    verify: () => mockedClaim()
  };
});

describe('CognitoJwtVerifier', () => {
  const cognitoJwtVerifier = new CognitoJwtVerifier(config);

  it('should not verify an invalid cognito jwt token', async () => {
    // given
    const jwt = 'invalidJwtToken';

    // when
    const jwtVerification = await cognitoJwtVerifier.verify(jwt);

    // then
    expect(jwtVerification.isValid).toBeFalsy();
  });

  it('should not verify an empty cognito jwt token', async () => {
    // given
    const jwt = '';

    // when
    const jwtVerification = await cognitoJwtVerifier.verify(jwt);

    //then
    expect(jwtVerification.isValid).toBeFalsy();
  });

  it('should verify a valid cognito jwt token', async () => {
    // given
    const iss = `https://cognito-idp.${config.APP_COGNITO.REGION}.amazonaws.com/${config.APP_COGNITO.USER_POOL_ID}`;
    const kid = 'testKid';
    const authTime = 1671188177;
    const currentTime = 1671188197;
    const expirationTime = 1671188297;
    const jwt = jwtFixture(kid, 'SuperSecret', {
      iss,
      auth_time: authTime,
      exp: expirationTime,
      iat: currentTime
    });

    mockedAxiosGet.mockReturnValueOnce({
      data: {
        keys: [
          publicKeyFixture({
            kid
          })
        ]
      }
    });

    mockedClaim.mockReturnValueOnce(
      claimFixture({
        auth_time: authTime,
        iss,
        exp: expirationTime
      })
    );

    jest.spyOn(dateService, 'getCurrentSeconds').mockReturnValueOnce(currentTime);

    // when
    const jwtVerification = await cognitoJwtVerifier.verify(jwt);

    // then
    expect(jwtVerification.isValid).toBeTruthy();
  });
});
