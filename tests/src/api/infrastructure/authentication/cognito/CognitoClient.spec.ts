import { CognitoClient } from '../../../../../../src/api/infrastructure/authentication/cognito/CognitoClient';
import { config } from '../../../../../../config';
import { AuthenticationResponse } from '../../../../../../src/api/application/authentication/AuthenticationService';
import { jwtFixture } from '../../../../../__fixtures__/jwtFixture';
import {
  AuthenticationDetails,
  CognitoAccessToken,
  CognitoUserSession,
  IAuthenticationCallback
} from 'amazon-cognito-identity-js';
import { createMock } from 'ts-auto-mock';

export const mockedAuthenticationResult = jest.fn().mockReturnValue(true);

jest.mock('amazon-cognito-identity-js', () => ({
  AuthenticationDetails: class {},
  CognitoUser: class {
    authenticateUser(
      authenticationDetails: AuthenticationDetails,
      callbacks: IAuthenticationCallback
    ): void {
      if (mockedAuthenticationResult()) {
        callbacks.onSuccess(
          createMock<CognitoUserSession>({
            getAccessToken: () =>
              createMock<CognitoAccessToken>({
                getJwtToken: jest.fn().mockReturnValue(jwtFixture()),
                getExpiration: jest.fn().mockReturnValue(7200),
                getIssuedAt: jest.fn().mockReturnValue(3600)
              })
          })
        );
      } else {
        callbacks.onFailure(new Error('Invalid Authentication'));
      }
    }
  },
  CognitoUserPool: class {}
}));

describe('CognitoClient', () => {
  it('should return successful authentication response', async () => {
    // given
    const cognitoClient = new CognitoClient(config);
    const expectedResponse: AuthenticationResponse = {
      accessToken: jwtFixture(),
      expiresIn: 3600
    };

    // when
    const authenticateUserResponse = await cognitoClient.authenticateUser('test', 'test');

    // then
    expect(authenticateUserResponse).toStrictEqual(expectedResponse);
  });

  it('should throw an error when authentication failed', async () => {
    // given
    const cognitoClient = new CognitoClient(config);
    mockedAuthenticationResult.mockReturnValueOnce(false);

    // when
    try {
      await cognitoClient.authenticateUser('test', 'test');
    } catch (error) {
      // then
      expect(error).toStrictEqual(new Error('Invalid Authentication'));
    }
  });
});
