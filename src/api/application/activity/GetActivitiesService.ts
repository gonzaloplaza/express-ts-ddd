import { Activity } from '@prisma/client';
import IActivityRepository from '../../domain/model/Activity/IActivityRepository';

export class GetActivitiesService {
    constructor(private activityRepository: IActivityRepository) {}

    public async invoke(): Promise<Activity[]> {
        return await this.activityRepository.all();
    }
}
