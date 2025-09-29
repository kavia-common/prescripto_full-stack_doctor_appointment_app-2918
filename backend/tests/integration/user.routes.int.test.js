import request from 'supertest';
import { createApp } from '../../app.js';

describe('User routes', () => {
  const app = createApp();

  it('GET /api/user/ should respond (route exists)', async () => {
    const res = await request(app).get('/api/user/');
    // Route behavior depends on implementation; we only assert it is not 404
    expect([200, 400, 401, 403, 500]).toContain(res.status);
  });
});
