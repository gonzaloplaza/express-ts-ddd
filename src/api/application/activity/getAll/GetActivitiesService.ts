import { IActivityRepository } from '../../../domain/model/activity/IActivityRepository';
import { GetActivitiesResponse } from './types'

export class GetActivitiesService {
  constructor(private activityRepository: IActivityRepository) {}

  public async invoke(): Promise<GetActivitiesResponse> {
    return await this.activityRepository.all();
  }
}
