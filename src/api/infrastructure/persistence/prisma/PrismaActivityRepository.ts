import { Activity, PrismaClient } from '@prisma/client';
import IActivityRepository from '../../../domain/model/Activity/IActivityRepository';

export class PrismaActivityRepository implements IActivityRepository {
    constructor(private db: PrismaClient) {}

    public async all(): Promise<Activity[]> {
        return await this.db.activity.findMany();
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
