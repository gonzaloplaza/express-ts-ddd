import { ServerLogger } from '../../../../src/shared/infrastructure/logger';
import { createMock } from 'ts-auto-mock';
import faker from 'faker';

const loggerMock = createMock<ServerLogger>();

describe('ServerLogger', () => {
  it('should execute info function to register a log', () => {
    expect(loggerMock.info(faker.random.words())).toBe(undefined);
  });

  it('should execute debug function to register a log', () => {
    expect(loggerMock.debug(faker.random.words())).toBe(undefined);
  });

  it('should execute warning function to register a log', () => {
    expect(loggerMock.warning(faker.random.words())).toBe(undefined);
  });
});
