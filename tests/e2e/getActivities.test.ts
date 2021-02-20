import request from 'supertest';
import { app } from './bootstrap';

describe('GET /api/v1/activities', () => {
  it('should get unauthorized 401 error response with no token', async () => {
    const res = await request(app).get('/api/v1/activities').send();
    expect(res.status).toEqual(401);
  });

  it('should get unauthorized 401 error response with invalid token', async () => {
    const res = await request(app)
      .get('/api/v1/activities')
      .send()
      .set({ Authorization: 'Bearer invalidToken', Accept: 'application/json' });
    expect(res.status).toEqual(401);
  });
});
