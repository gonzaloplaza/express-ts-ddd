import { PrismaActivityRepository } from '../../../../src/api/infrastructure/persistence/prisma/PrismaActivityRepository';
import { createMock } from 'ts-auto-mock';
import faker from 'faker';

const prismaActivityRepositoryMock = createMock<PrismaActivityRepository>();

describe('PrismaActivityRepository', () => {
  it('should resolve an empty array from all repository function', async () => {
    expect.assertions(1);
    expect(prismaActivityRepositoryMock.all()).resolves.toStrictEqual([]);
  });

  it('should execute activity creation method', async () => {
    expect.assertions(1);
    expect(
      prismaActivityRepositoryMock.create(faker.random.words(), faker.random.words())
    ).resolves.toBe(undefined);
  });
});
