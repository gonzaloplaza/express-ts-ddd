import { NextFunction, Request, Response } from 'express';
import { config } from '../../../../../../config';
import { CognitoAuthorizer } from '../../../../../../src/api/infrastructure/authentication/cognito';
import { createMock } from 'ts-auto-mock';
import { jwtFixture } from '../../../../../__fixtures__/jwtFixture';
import { ErrorHandler } from '../../../../../../src/shared/domain/ErrorHandler';
import { CognitoJwtVerifier } from '../../../../../../src/api/infrastructure/authentication/cognito/CognitoJwtVerifier';

describe('CognitoAuthorizer', () => {
  const mockedRequest = createMock<Request>({
    headers: { authorization: `Bearer ${jwtFixture()}` }
  });
  const mockedResponse: Response = createMock<Response>({});
  const mockedNext: NextFunction = jest.fn();
  const mockedCognitoJwtVerifierResponse = jest.fn().mockResolvedValue({});
  const mockedCognitoJwtVerifier = createMock<CognitoJwtVerifier>({
    verify: mockedCognitoJwtVerifierResponse
  });
  const testEmail = 'test@email.com';

  it('should authorize a valid token', async () => {
    // given
    mockedCognitoJwtVerifierResponse.mockResolvedValueOnce({
      userName: testEmail,
      isValid: true
    });
    mockedRequest.headers = { authorization: `Bearer ${jwtFixture()}` };
    const cognitoAuthorizer = new CognitoAuthorizer(config, mockedCognitoJwtVerifier);

    // when
    await cognitoAuthorizer.authorize(mockedRequest, mockedResponse, mockedNext);

    // then
    expect(mockedRequest.headers.user_id).toBe(testEmail);
    expect(mockedNext).toHaveBeenCalledTimes(1);
  });

  it('should throw an error when token is invalid or expired', async () => {
    // given
    mockedCognitoJwtVerifierResponse.mockResolvedValueOnce({
      error: 'error_message',
      isValid: false
    });
    mockedRequest.headers = { authorization: `Bearer ${jwtFixture()}` };
    const cognitoAuthorizer = new CognitoAuthorizer(config, mockedCognitoJwtVerifier);

    // when
    await cognitoAuthorizer.authorize(mockedRequest, mockedResponse, mockedNext);

    // then
    expect(mockedNext).toHaveBeenCalledWith(new ErrorHandler('Unauthorized: error_message', 401));
  });

  it('should throw an error when the JWT verifier throws an error', async () => {
    // given
    mockedCognitoJwtVerifierResponse.mockRejectedValueOnce(new Error('error_message'));
    const cognitoAuthorizer = new CognitoAuthorizer(config, mockedCognitoJwtVerifier);
    mockedRequest.headers = {};

    // when
    await cognitoAuthorizer.authorize(mockedRequest, mockedResponse, mockedNext);

    // then
    expect(mockedNext).toHaveBeenCalledWith(new ErrorHandler('Unauthorized: error_message', 401));
  });
});
