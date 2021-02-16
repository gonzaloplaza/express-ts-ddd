import request from 'supertest';
import { app } from './bootstrap';

describe('GET /health_check', () => {
  it('should get HealthCheck success response', async () => {
    const res = await request(app).get('/health_check').send();
    expect(res.status).toEqual(200);
    expect(res.body).toHaveProperty('id');
    expect(res.body).toHaveProperty('success');
    expect(res.body).toHaveProperty('date');
    expect(res.body.success).toBeTruthy();
  });
});
