import IActivityRepository from '../../../src/api/domain/model/Activity/IActivityRepository';
import { GetActivitiesService } from '../../../src/api/application';
import { createMock } from 'ts-auto-mock';

describe('GetActivitiesService', () => {
    const activityRepositoryMock: IActivityRepository = createMock<IActivityRepository>();
    const service = new GetActivitiesService(activityRepositoryMock);

    it('should obtain an array of activities', () => {
        expect.assertions(1);
        return service.invoke().then((response) => {
            expect(response).toBeInstanceOf(Array);
        });
    });
});
