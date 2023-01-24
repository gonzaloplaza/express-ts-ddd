import {PrismaClient} from '@prisma/client';

export const PrismaClientInstance = (): PrismaClient => new PrismaClient();
