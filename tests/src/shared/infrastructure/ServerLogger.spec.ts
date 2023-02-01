import { mockedWinstonLogger as mockedLogger } from '../../../__mocks__/winston';
import { ServerLogger } from '../../../../src/shared/infrastructure/logger';
import { config } from '../../../../config';

describe('ServerLogger', () => {
  beforeEach(() => jest.clearAllMocks());
  afterAll(() => jest.clearAllMocks());

  const logText = 'some_log_text';

  it('should execute debug function to register a log', () => {
    // given
    const serverLogger = new ServerLogger(config);

    // when
    serverLogger.debug(logText);

    // then
    expect(mockedLogger.debug).toHaveBeenCalledWith(logText);
  });

  it('should execute info function to register a log', () => {
    // given
    const serverLogger = new ServerLogger(config);

    // when
    serverLogger.info(logText);

    // then
    expect(mockedLogger.info).toHaveBeenCalledWith(logText);
  });

  it('should execute error function to register a log', () => {
    // given
    const serverLogger = new ServerLogger(config);
    // when
    serverLogger.error(logText);

    // then
    expect(mockedLogger.error).toHaveBeenCalledWith(logText);
  });

  it('should execute warn function to register a log', () => {
    // given
    const serverLogger = new ServerLogger(config);
    // when
    serverLogger.warning(logText);

    // then
    expect(mockedLogger.warn).toHaveBeenCalledWith(logText);
  });

  it('should execute crit function to register a log', () => {
    // given
    const serverLogger = new ServerLogger(config);
    // when
    serverLogger.critical(logText);

    // then
    expect(mockedLogger.crit).toHaveBeenCalledWith(logText);
  });
});
