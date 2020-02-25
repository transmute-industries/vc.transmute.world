const request = require('supertest');
const app = require('../app');

describe('Issuer Credential API', () => {
  it('should return a valid json', async () => {
    const res = await request(app).get('/api/issuer/');
    expect(res).toBeDefined();
    expect(res.body).toBeDefined();
    expect(res.body.issuer).toBeTruthy();
  });
});
