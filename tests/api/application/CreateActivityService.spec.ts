import { IActivityRepository } from '../../../src/api/domain/model/activity/IActivityRepository';
import { CreateActivityService, CreateActivityRequest } from '../../../src/api/application';
import { createMock } from 'ts-auto-mock';

describe('CreateActivityService', () => {
  const activityRepositoryMock: IActivityRepository = createMock<IActivityRepository>();
  const service = new CreateActivityService(activityRepositoryMock);

  it('should not throw in acitivity creation', async () => {
    expect.assertions(1);

    const testRequest: CreateActivityRequest = {
      type: 'Test type',
      content: 'Test content!'
    };

    await expect(service.invoke(testRequest)).resolves.not.toThrow();
  });

  it('should resolve an activity creation', async () => {
    expect.assertions(1);
    const testRequest: CreateActivityRequest = {
      type: 'Test type',
      content: 'Test content!'
    };
    await expect(service.invoke(testRequest)).resolves.toBe(undefined);
  });
});
