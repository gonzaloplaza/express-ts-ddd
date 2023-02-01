import { HealthCheckService } from '../../../../../src/api/application';
import { IUuidGenerator } from '../../../../../src/shared/domain/IUuidGenerator';
import { createMock } from 'ts-auto-mock';

describe('HealthCheckService', () => {
  const uuidGeneratorMock: IUuidGenerator = createMock<IUuidGenerator>();
  const healthCheckService = new HealthCheckService(uuidGeneratorMock);

  it('should obtain a success response', async () => {
    // when
    const response = await healthCheckService.invoke();

    // then
    expect(typeof response.id).toBe('string');
    expect(response.success).toBeTruthy();
  });
});
