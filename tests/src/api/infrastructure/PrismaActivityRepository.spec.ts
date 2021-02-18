import { PrismaActivityRepository } from '../../../../src/api/infrastructure/persistence/prisma/PrismaActivityRepository';
import { createMock } from 'ts-auto-mock';

const prismaActivityRepositoryMock = createMock<PrismaActivityRepository>();

describe('PrismaActivityRepository', () => {
  it('should resolves the "all" function from repository with empty array', () => {
    expect(prismaActivityRepositoryMock.all()).resolves.toStrictEqual([]);
  });
});
