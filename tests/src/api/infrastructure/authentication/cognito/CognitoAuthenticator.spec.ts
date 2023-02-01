import { CognitoAuthenticator } from '../../../../../../src/api/infrastructure/authentication/cognito';
import { config } from '../../../../../../config';
import fakerStatic from 'faker';
import { CognitoClient } from '../../../../../../src/api/infrastructure/authentication/cognito/CognitoClient';
import { createMock } from 'ts-auto-mock';

describe('CognitoAuthenticator', () => {
  const mockedAuthenticateUserResponse = jest.fn().mockResolvedValue({});

  const mockedCognitoClient = createMock<CognitoClient>({
    authenticateUser: mockedAuthenticateUserResponse
  });
  const cognitoAuthenticator = new CognitoAuthenticator(config, mockedCognitoClient);

  it('should rejects an UserNotFoundException object', async () => {
    //given
    const userDoesNotExistError = new Error('User does not exist.');
    mockedAuthenticateUserResponse.mockRejectedValue(userDoesNotExistError);

    // then
    await expect(
      cognitoAuthenticator.auth({
        username: fakerStatic.internet.exampleEmail(),
        password: fakerStatic.internet.password()
      })
    ).rejects.toThrow(userDoesNotExistError);
  });
});
