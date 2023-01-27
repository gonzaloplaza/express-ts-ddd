import { NextFunction, Request, Response } from 'express';
import { config } from '../../../../../../config';
import { CognitoAuthorizer } from '../../../../../../src/api/infrastructure/authentication/cognito';

const cognitoAuthorizer = new CognitoAuthorizer(config);

describe('CognitoAuthorizer', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockNextFunction: NextFunction;

  beforeEach(() => {
    mockRequest = {
      headers: {
        authorization: 'Bearer invalidToken'
      }
    };
    mockResponse = {
      json: jest.fn()
    };
    mockNextFunction = jest.fn(function () {
      return;
    });
  });

  it('should call authorizer middleware nextFunction', async () => {
    jest.spyOn(cognitoAuthorizer, 'authorize');
    await cognitoAuthorizer.authorize(
      mockRequest as Request,
      mockResponse as Response,
      mockNextFunction
    );

    expect(cognitoAuthorizer.authorize).toHaveBeenCalledTimes(1);
    expect(mockNextFunction).toBeCalledTimes(1);
  });
});
