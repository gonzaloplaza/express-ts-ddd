jest.mock('winston', () => ({
  format: {
    colorize: jest.fn(),
    combine: jest.fn(),
    splat: jest.fn(),
    json: jest.fn(),
    simple: jest.fn(),
    timestamp: jest.fn(),
    errors: jest.fn()
  },
  createLogger: jest.fn().mockReturnValue(mockedWinstonLogger),
  transports: {
    Console: jest.fn(),
    File: jest.fn()
  }
}));

export const mockedWinstonLogger = {
  info: jest.fn(),
  debug: jest.fn(),
  error: jest.fn(),
  warn: jest.fn(),
  crit: jest.fn()
};
