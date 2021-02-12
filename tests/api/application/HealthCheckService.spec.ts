import { HealthCheckService } from '../../../src/api/application/healthcheck/HealthCheckService';
import IUuidGenerator from '../../../src/shared/domain/IUuidGenerator';
import { createMock } from 'ts-auto-mock';

describe('HealthCheckService', () => {
  const uuidGeneratorMock: IUuidGenerator = createMock<IUuidGenerator>();
  const healthCheckService = new HealthCheckService(uuidGeneratorMock);

  it('should obtain a success response', () => {
    const response = healthCheckService.invoke();
    expect(typeof response.id).toBe('string');
    expect(response.success).toBeTruthy();
  });
});
