const request = require('supertest');
const app = require('../app');

const verifiableCredential = require('../routes/verifiable-credential.json');

describe('Issuer Credential API', () => {
  describe('GET /', () => {
    it('should return a valid json', async () => {
      const res = await request(app).get('/api/issuer');
      expect(res).toBeDefined();
      expect(res.body).toBeDefined();
      expect(res.body.issuer).toBeTruthy();
    });
  });

  describe('POST /credential', () => {
    it('should return a verifiable credential', async () => {
      const res = await request(app)
        .post('/api/issuer/credential')
        .send({})
        .set('Accept', 'application/json');
      expect(res).toBeDefined();
      expect(res.body).toEqual(verifiableCredential);
    });
  });
});
