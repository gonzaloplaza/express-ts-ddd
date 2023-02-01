import { createMock } from 'ts-auto-mock';
import { IActivityRepository } from '../../../../../../src/api/domain/model/activity/IActivityRepository';
import { GetActivitiesService } from '../../../../../../src/api/application';

describe('GetActivitiesService', () => {
  const activityRepositoryMock: IActivityRepository = createMock<IActivityRepository>();
  const service = new GetActivitiesService(activityRepositoryMock);

  it('should resolve an array of activities', async () => {
    expect.assertions(1);
    await expect(service.invoke()).resolves.toBeInstanceOf(Array);
  });
});
