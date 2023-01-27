import { IAuthenticator } from '../../../../src/api/domain/model/authentication/IAuthenticator';
import { ILogger } from '../../../../src/shared/domain/ILogger';
import { createMock } from 'ts-auto-mock';
import faker from 'faker';
import {
  AuthenticationService,
  AuthenticationResponse
} from '../../../../src/api/application/authentication/AuthenticationService';

describe('AuthenticatorService', () => {
  const mockedAuthenticatorResponse = jest.fn().mockResolvedValue({});
  const authenticatorMock = createMock<IAuthenticator>({
    auth: mockedAuthenticatorResponse
  });
  const loggerMock = createMock<ILogger>();
  const authenticationService = new AuthenticationService(loggerMock, authenticatorMock);

  it('should return an AuthenticationResponse object', async () => {
    // given
    const authenticationRequest = {
      username: faker.internet.email(),
      password: faker.internet.password()
    };
    const expectedAuthenticationResponse = { accessToken: 'testToken', expiresIn: 12345 };
    mockedAuthenticatorResponse.mockResolvedValueOnce(expectedAuthenticationResponse);

    // when
    const authenticationResponse: AuthenticationResponse = await authenticationService.invoke(
      authenticationRequest
    );

    // then
    expect(authenticationResponse).toStrictEqual(expectedAuthenticationResponse);
  });
});
