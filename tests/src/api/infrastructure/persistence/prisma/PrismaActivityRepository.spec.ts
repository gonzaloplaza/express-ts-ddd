import { PrismaActivityRepository } from '../../../../../../src/api/infrastructure/persistence/prisma/PrismaActivityRepository';
import { mockedPrismaClient } from '../../../../../__mocks__/prisma/PrismaClientMock';

describe('PrismaActivityRepository', () => {
  const prismaActivityRepository = new PrismaActivityRepository(mockedPrismaClient);

  it('should resolve an empty array from all repository function', async () => {
    //given
    mockedPrismaClient.activity.findMany.mockResolvedValueOnce([]);

    // when
    const result = await prismaActivityRepository.all();

    // then
    expect(result).toStrictEqual([]);
  });

  it('should execute Prisma activity creation method', async () => {
    //given

    // when
    await prismaActivityRepository.create('testType', 'testActivity');

    // then
    expect(mockedPrismaClient.activity.create).toHaveBeenCalledTimes(1);
  });
});
