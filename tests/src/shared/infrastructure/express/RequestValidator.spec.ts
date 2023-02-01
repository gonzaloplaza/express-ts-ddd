import { RequestValidator } from '../../../../../src/shared/infrastructure/express/RequestValidator';
import { Request, Response } from 'express';
import { mock } from 'jest-mock-extended';

describe('RequestValidator', () => {
  const mockedResponse: Response = mock<Response>({
    status: jest.fn(() => mockedResponse),
    json: jest.fn(() => mockedResponse)
  });
  const mockedNext = jest.fn();

  it('should pass validation with an empty request', () => {
    // given
    const mockedRequest = {} as Request;

    // when
    RequestValidator(mockedRequest, mockedResponse, mockedNext);

    // then
    expect(mockedNext).toHaveBeenCalled();
  });
});
