import { ServerLogger } from '../../../../src/shared/infrastructure/logger';
import { createMock } from 'ts-auto-mock';
import faker from 'faker';

const loggerMock = createMock<ServerLogger>();

describe('ServerLogger', () => {
  it('should execute info function to register a log', () => {
    expect(loggerMock.info(faker.random.words())).toBe(undefined);
  });
});
