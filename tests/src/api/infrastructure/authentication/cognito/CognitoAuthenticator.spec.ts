import { CognitoAuthenticator } from '../../../../../../src/api/infrastructure/authentication/cognito';
import { config } from '../../../../../../config';
import { CognitoClient } from '../../../../../../src/api/infrastructure/authentication/cognito/CognitoClient';
import { createMock } from 'ts-auto-mock';
import { randomTextFixture } from '../../../../../__fixtures__/randomTextFixture';

describe('CognitoAuthenticator', () => {
  const mockedAuthenticateUserResponse = jest.fn().mockResolvedValue({});

  const mockedCognitoClient = createMock<CognitoClient>({
    authenticateUser: mockedAuthenticateUserResponse
  });
  const cognitoAuthenticator = new CognitoAuthenticator(config, mockedCognitoClient);

  it('should rejects an UserNotFoundException object', async () => {
    //given
    const randomUsername = randomTextFixture(10);
    const userDoesNotExistError = new Error('User does not exist.');
    mockedAuthenticateUserResponse.mockRejectedValue(userDoesNotExistError);

    // then
    await expect(
      cognitoAuthenticator.auth({
        username: `${randomUsername}@test.com`,
        password: randomTextFixture(18)
      })
    ).rejects.toThrow(userDoesNotExistError);
  });
});
