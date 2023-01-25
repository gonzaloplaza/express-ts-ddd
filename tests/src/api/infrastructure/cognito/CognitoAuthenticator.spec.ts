import { CognitoAuthenticator } from '../../../../../src/api/infrastructure/authentication/cognito';
import { config } from '../../../../../config';
import fakerStatic from 'faker';

const cognitoAuthenticator = new CognitoAuthenticator(config);

describe('CognitoAuthenticator', () => {
  it('should rejects an UserNotFoundException object', async () => {
    expect.assertions(1);

    await expect(
      cognitoAuthenticator.auth({
        username: fakerStatic.internet.exampleEmail(),
        password: fakerStatic.internet.password()
      })
    ).rejects.toThrow('User does not exist.');
  });
});
