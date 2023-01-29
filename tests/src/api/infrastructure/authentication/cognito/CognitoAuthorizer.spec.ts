import { NextFunction, Request, Response } from 'express';
import { config } from '../../../../../../config';
import { CognitoAuthorizer } from '../../../../../../src/api/infrastructure/authentication/cognito';
import { createMock } from 'ts-auto-mock';
import { jwtFixture } from '../../../../../__fixtures__/jwtFixture';

describe('CognitoAuthorizer', () => {
  it('should authorize a token', async () => {
    // given
    const mockedRequest = createMock<Request>({
      headers: { authorization: `Bearer ${jwtFixture()}` }
    });
    const mockedResponse: Response = createMock<Response>({});
    const mockedNext = jest.fn();

    const cognitoAuthorizer = new CognitoAuthorizer(config);

    await cognitoAuthorizer.authorize(mockedRequest, mockedResponse, mockedNext);

    expect(mockedNext).toHaveBeenCalledTimes(1);
  });

  it('should authorize a token', async () => {
    // given
    const mockedRequest = createMock<Request>({
      headers: { authorization: `Bearer Invalid` }
    });
    const mockedResponse: Response = createMock<Response>({});
    const mockedNext = jest.fn();

    const cognitoAuthorizer = new CognitoAuthorizer(config);

    await cognitoAuthorizer.authorize(mockedRequest, mockedResponse, mockedNext);

    expect(mockedNext).toHaveBeenCalledTimes(1);
  });
});
