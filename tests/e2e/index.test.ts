import request from 'supertest';
import { app } from './bootstrap';

describe('GET /', () => {
  it('should get index response', async () => {
    const res = await request(app).get('/').send();
    expect(res.status).toEqual(200);
    expect(res.body).toStrictEqual({});
  });
});
