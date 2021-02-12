import { Activity } from '@prisma/client';

export default interface IActivityRepository {
  all(): Promise<Activity[]>;
  create(type: string, content: string): Promise<void>;
}
