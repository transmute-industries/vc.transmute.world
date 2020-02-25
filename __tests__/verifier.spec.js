const request = require('supertest');
const app = require('../app');

describe('Verifier Credential API', () => {
  it('should return a valid json', async () => {
    const res = await request(app).get('/api/verifier');
    expect(res).toBeDefined();
    expect(res.body).toBeDefined();
    expect(res.body.verifier).toBeTruthy();
  });
});
