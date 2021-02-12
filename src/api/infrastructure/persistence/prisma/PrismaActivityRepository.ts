import { Activity, PrismaClient } from '@prisma/client';
import IActivityRepository from '../../../domain/model/activity/IActivityRepository';

export class PrismaActivityRepository implements IActivityRepository {
  constructor(private db: PrismaClient) {}

  public async all(): Promise<Activity[]> {
    return await this.db.activity.findMany({
      where: {},
      orderBy: {
        createdAt: 'desc'
      }
    });
  }

  public async create(type: string, content: string): Promise<void> {
    const activity = await this.db.activity.create({
      data: {
        type: type,
        content: content
      }
    });

    console.log(activity);
  }
}
