import { Activity } from '@prisma/client';
import { IActivityRepository } from '../../../domain/model/activity/IActivityRepository';

export type GetActivitiesResponse = Activity[];

export class GetActivitiesService {
  constructor(private activityRepository: IActivityRepository) {}

  public async invoke(): Promise<GetActivitiesResponse> {
    return await this.activityRepository.all();
  }
}
