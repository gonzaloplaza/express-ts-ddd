import { createMock } from 'ts-auto-mock';
import { AuthenticationService } from '../../../../../../../src/api/application';
import { Request, Response } from 'express';
import { PostAuthenticationController } from '../../../../../../../src/api/infrastructure/express/controllers';
import { jwtFixture } from '../../../../../../__fixtures__/jwtFixture';

describe('Authentication Controller', () => {
  it('should invoke Authentication Controller', async () => {
    // given
    const authenticationServiceResponse = { accessToken: jwtFixture(), expiresIn: 3600 };
    const mockedAuthenticationService = createMock<AuthenticationService>({
      invoke: jest.fn().mockResolvedValueOnce(authenticationServiceResponse)
    });
    const mockedRequest = createMock<Request>({ body: {} });
    const mockedResponse: Response = createMock<Response>({
      setHeader: jest.fn(),
      status: jest.fn(),
      json: jest.fn(() => mockedResponse)
    });
    const authenticationController = new PostAuthenticationController(mockedAuthenticationService);

    // when
    await authenticationController.invoke(mockedRequest, mockedResponse, jest.fn());

    // then
    expect(mockedAuthenticationService.invoke).toHaveBeenCalledTimes(1);
    expect(mockedResponse.status).toHaveBeenCalledWith(200);
    expect(mockedResponse.setHeader).toHaveBeenCalledWith(
      'Authorization',
      `Bearer ${authenticationServiceResponse.accessToken}`
    );
    expect(mockedResponse.json).toHaveBeenCalledWith(authenticationServiceResponse);
  });
});
