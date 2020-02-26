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

    it('should return false if signature is invalid', async () => {
      const res = await request(app)
        .post('/api/verifier/verifications')
        .send({
          ...vc,
          proof: {
            ...vc.proof,
            // invalid jws
            jws:
              'eyJhbGciOiJFZERTQSIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..LMcsP-RG5mIG7zLbN1t6leiKv3WOx2PhUF0U0QCSpygCH7fYbKj_6JDJEINe-BJn4AkOpty-Rbm7ZTunG_ZVAw',
          },
        })
        .set('Accept', 'application/json');
      expect(res).toBeDefined();
      expect(res.body).toBeDefined();
      expect(res.body.verified).toBeFalsy();
      expect(res.body.error.errors[0].message).toBe('Invalid signature.');
    });
  });
});
