const request = require('supertest');
const app = require('../app');

describe('Verifier Credential API', () => {
  let vc;

  beforeAll(async () => {
    const res = await request(app)
      .post('/api/issuer/credential')
      .send()
      .set('Accept', 'application/json');
    vc = res.body;
  });

  describe('POST /verifications', () => {
    it('should return true if credential is valid', async () => {
      const res = await request(app)
        .post('/api/verifier/verifications')
        .send(vc)
        .set('Accept', 'application/json');
      expect(res).toBeDefined();
      expect(res.body).toBeDefined();
      expect(res.body.verified).toBeTruthy();
    });
  });
});
