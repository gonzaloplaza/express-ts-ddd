import request from 'supertest';
import { app } from '../bootstrap';

describe('POST /api/v1/activities', () => {
  it('should get unauthorized 401 error response with no token', async () => {
    const res = await request(app).post('/api/v1/activities').send();
    expect(res.status).toEqual(401);
  });
});
