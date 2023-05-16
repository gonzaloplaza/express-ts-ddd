import { IActivityRepository } from '../../../domain/model/activity/IActivityRepository';
import { CreateActivityRequest, CreateActivityResponse } from './types/'

export class CreateActivityService {
  constructor(private activityRepository: IActivityRepository) {}

  public async invoke(
    createActivityRequest: CreateActivityRequest
  ): Promise<CreateActivityResponse> {
    await this.activityRepository.create(createActivityRequest.type, createActivityRequest.content);
  }
}
