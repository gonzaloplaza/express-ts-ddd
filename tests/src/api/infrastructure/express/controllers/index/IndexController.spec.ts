import { createMock } from 'ts-auto-mock';
import { Request, Response } from 'express';
import { IndexController } from '../../../../../../../src/api/infrastructure/express/controllers';

describe('Index Controller', () => {
  it('should return json response', async () => {
    // given
    const mockedRequest = {} as Request;
    const mockedResponse = createMock<Response>({
      json: jest.fn()
    });
    const indexController = new IndexController();

    // when
    await indexController.invoke(mockedRequest, mockedResponse);

    // then
    expect(mockedResponse.json).toHaveBeenCalledTimes(1);
  });
});
