import { createMock } from 'ts-auto-mock';
import { GetActivitiesService } from '../../../../../../../src/api/application';
import { Request, Response } from 'express';
import { GetActivitiesController } from '../../../../../../../src/api/infrastructure/express/controllers';

describe('GetActivities Controller', () => {
  it('should invoke GetActivities Controller and return json response when service succeeded', async () => {
    // given
    const mockedGetActivitiesService = createMock<GetActivitiesService>({
      invoke: jest.fn().mockResolvedValueOnce({})
    });
    const mockedRequest = {} as Request;
    const mockedResponse = createMock<Response>({
      json: jest.fn()
    });
    const getActivitiesController = new GetActivitiesController(mockedGetActivitiesService);

    // when
    await getActivitiesController.invoke(mockedRequest, mockedResponse, jest.fn());

    // then
    expect(mockedGetActivitiesService.invoke).toHaveBeenCalledTimes(1);
    expect(mockedResponse.json).toHaveBeenCalledTimes(1);
  });
});
