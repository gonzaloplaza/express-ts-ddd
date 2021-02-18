import { IAuthenticator } from '../../../../src/api/domain/model/authentication/IAuthenticator';
import { ILogger } from '../../../../src/shared/domain/ILogger';
import { createMock } from 'ts-auto-mock';
import faker from 'faker';
import {
  AuthenticationService,
  AuthenticationResponse
} from '../../../../src/api/application/authentication/AuthenticationService';

describe('AuthenticatorService', () => {
  const authenticatorMock = createMock<IAuthenticator>();
  const loggerMock = createMock<ILogger>();
  const authenticationService = new AuthenticationService(loggerMock, authenticatorMock);

  it('should return an AuthenticationResponse object', async () => {
    const authenticationResponse: AuthenticationResponse = await authenticationService.invoke({
      username: faker.internet.email(),
      password: faker.internet.password()
    });

    expect(typeof authenticationResponse.accessToken).toBe('string');
    expect(typeof authenticationResponse.expiresIn).toBe('number');
  });
});
