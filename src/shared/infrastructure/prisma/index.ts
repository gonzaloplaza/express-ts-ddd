import { PrismaClient } from '@prisma/client';

export const PrismaClientInstance = (): PrismaClient => {
    const prisma = new PrismaClient();

    return prisma;
};
