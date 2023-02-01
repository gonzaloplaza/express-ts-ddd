import { createMock } from 'ts-auto-mock';
import { CreateActivityService } from '../../../../../../../src/api/application';
import { Request, Response } from 'express';
import { CreateActivityController } from '../../../../../../../src/api/infrastructure/express/controllers';

describe('CreateActivity Controller', () => {
  it('should invoke CreateActivity Controller and return json response when service succeeded', async () => {
    // given
    const mockedCreateActivityService = createMock<CreateActivityService>({
      invoke: jest.fn().mockResolvedValueOnce({})
    });
    const createActivityRequest = {
      type: 'testType',
      content: 'testContent'
    };
    const mockedRequest = {
      body: createActivityRequest
    } as Request;
    const mockedResponse: Response = createMock<Response>({
      status: jest.fn(),
      json: jest.fn(() => mockedResponse)
    });
    const createActivityController = new CreateActivityController(mockedCreateActivityService);

    // when
    await createActivityController.invoke(mockedRequest, mockedResponse, jest.fn());

    // then
    expect(mockedCreateActivityService.invoke).toHaveBeenCalledWith(createActivityRequest);
    expect(mockedResponse.json).toHaveBeenCalledTimes(1);
  });
});
