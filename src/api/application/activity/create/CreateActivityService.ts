import { IActivityRepository } from '../../../domain/model/activity/IActivityRepository';

export type CreateActivityRequest = {
  type: string;
  content: string;
};

type CreateActivityResponse = void;

export class CreateActivityService {
  constructor(private activityRepository: IActivityRepository) {}

  public async invoke(
    createActivityRequest: CreateActivityRequest
  ): Promise<CreateActivityResponse> {
    await this.activityRepository.create(createActivityRequest.type, createActivityRequest.content);
  }
}
