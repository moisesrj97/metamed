import LogsMiddleware from './logger.middleware';

describe('LoggerMiddleware', () => {
  it('should be defined', () => {
    expect(new LogsMiddleware()).toBeDefined();
  });
});
