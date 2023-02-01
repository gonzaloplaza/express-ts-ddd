import { ErrorMiddleware } from '../../../../../src/shared/infrastructure/express/ErrorMiddleware';
import { ServerLogger } from '../../../../../src/shared/infrastructure/logger';
import { Request, Response } from 'express';
import { mock } from 'jest-mock-extended';
import { ErrorHandler } from '../../../../../src/shared/domain/ErrorHandler';

describe('Error Middleware', () => {
  const mockedServerLogger = mock<ServerLogger>();
  const errorMiddleware = new ErrorMiddleware(mockedServerLogger);

  const mockedRequest = {} as Request;
  const mockedResponse: Response = mock<Response>({
    status: jest.fn(() => mockedResponse),
    json: jest.fn(() => mockedResponse)
  });
  const mockedNext = jest.fn();

  it('should send 404 error with Route not found message', () => {
    // when
    errorMiddleware.routeNotFoundErrorHandler(mockedRequest, mockedResponse);

    // then
    expect(mockedResponse.status).toHaveBeenCalledWith(404);
    expect(mockedResponse.json).toHaveBeenCalledWith({ status: 404, message: 'Route not found' });
  });

  it('should log and return a custom error', () => {
    // given
    const customError = new ErrorHandler('custom_error', 400);

    // when
    errorMiddleware.customErrorHandler(customError, mockedRequest, mockedResponse, jest.fn());

    // then
    expect(mockedResponse.status).toHaveBeenCalledWith(400);
    expect(mockedResponse.json).toHaveBeenCalledWith({ status: 400, message: 'custom_error' });
  });

  it('should log and return an unknown error', () => {
    // given
    const error = new Error('error');

    // when
    errorMiddleware.customErrorHandler(error, mockedRequest, mockedResponse, mockedNext);

    // then
    expect(mockedNext).toHaveBeenCalledWith(error);
  });

  it('should send 500 error with Something wrong happened message', () => {
    // given
    const error = new Error('global_error');

    // when
    errorMiddleware.globalErrorHandler(error, mockedRequest, mockedResponse, mockedNext);

    // then
    expect(mockedResponse.status).toHaveBeenCalledWith(500);
    expect(mockedResponse.json).toHaveBeenCalledWith({
      status: 500,
      message: 'Something wrong happened :`('
    });
  });
});
