import { Container } from '../../../src/shared/infrastructure/Container';
import { WinstonLogger } from '../../../src/shared/infrastructure/logger';

const container = new Container();
const logger = container.invoke().resolve<WinstonLogger>('logger');

describe('Winston Logger', () => {
  it('should execute info function to register a log', () => {
    jest.spyOn(logger, 'info');
    const testMessage = 'This is a test';
    logger.info(testMessage);
    expect(logger.info).toHaveBeenCalledWith(testMessage);
    expect(logger.info).toHaveBeenCalledTimes(1);
  });
});
