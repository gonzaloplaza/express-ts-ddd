import { PrismaClient } from '@prisma/client';
import { mockDeep, DeepMockProxy, mockReset } from 'jest-mock-extended';
import prismaClient from './client';

jest.mock('./client', () => ({
  __esModule: true,
  default: mockDeep<PrismaClient>()
}));

beforeEach(() => {
  mockReset(mockedPrismaClient);
});

afterAll(async () => {
  await mockedPrismaClient.$disconnect;
});

export const mockedPrismaClient = prismaClient as unknown as DeepMockProxy<PrismaClient>;
