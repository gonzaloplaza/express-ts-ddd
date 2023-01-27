import { CognitoJwtVerifier } from '../../../../../../src/api/infrastructure/authentication/cognito/CognitoJwtVerifier';
import { config } from '../../../../../../config';
import * as dateService from '../../../../../../src/shared/infrastructure/date';
import { jwtFixture } from '../../../../../__fixtures__/jwtFixture';
import { claimFixture } from '../../../../../__fixtures__/claimFixture';
import { publicKeyFixture } from '../../../../../__fixtures__/publicKeyFixture';

const mockedAxiosGet = jest.fn();
const mockedClaim = jest.fn();
jest.mock('axios', () => ({ get: () => mockedAxiosGet() }));
jest.mock('jsonwebtoken', () => ({ verify: () => mockedClaim() }));

describe('CognitoJwtVerifier', () => {
  const cognitoJwtVerifier = new CognitoJwtVerifier(
    config.APP_COGNITO.USER_POOL_ID,
    config.APP_COGNITO.REGION
  );

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
    const authTime = 1671188177;
    const currentTime = 1671188197;
    const expirationTime = 1671188297;
    const jwt = jwtFixture();
    mockedAxiosGet.mockReturnValueOnce({
      data: {
        keys: [
          publicKeyFixture({
            kid: 'EWMrFwNjQzCqs6k63kHiHx1qXA5Z4slYztIg1ktEQ9Y='
          })
        ]
      }
    });

    mockedClaim.mockReturnValueOnce(
      claimFixture({
        auth_time: authTime,
        iss: `https://cognito-idp.${config.APP_COGNITO.REGION}.amazonaws.com/${config.APP_COGNITO.USER_POOL_ID}`,
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
