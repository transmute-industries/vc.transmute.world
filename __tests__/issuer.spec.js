const request = require('supertest');
const app = require('../app');
const config = require('../config');

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
        .send()
        .set('Accept', 'application/json');
      expect(res).toBeDefined();
      expect(res.body).toBeDefined();
      const vc = res.body;
      expect(vc['@context']).toEqual([
        'https://www.w3.org/2018/credentials/v1',
        'https://www.w3.org/2018/credentials/examples/v1',
      ]);
      expect(vc.id).toContain('http://example.com/credentials/');
      expect(vc.type).toEqual(['VerifiableCredential']);
      expect(vc.issuanceDate).toBeDefined();
      expect(vc.issuer).toBe(config.issuer);
      expect(vc.credentialSubject).toEqual({});
    });

    it('should include the types provided if provided', async () => {
      const res = await request(app)
        .post('/api/issuer/credential')
        .send({
          types: ['UniversityDegreeCredential'],
        })
        .set('Accept', 'application/json');
      expect(res).toBeDefined();
      expect(res.body).toBeDefined();
      const vc = res.body;
      expect(vc.type).toEqual([
        'VerifiableCredential',
        'UniversityDegreeCredential',
      ]);
    });

    it('should include the subject provided if provided', async () => {
      const res = await request(app)
        .post('/api/issuer/credential')
        .send({
          subject: 'did:example:me',
        })
        .set('Accept', 'application/json');
      expect(res).toBeDefined();
      expect(res.body).toBeDefined();
      const vc = res.body;
      expect(vc.credentialSubject).toEqual({
        id: 'did:example:me',
      });
    });

    it('should include the claims provided if provided', async () => {
      const res = await request(app)
        .post('/api/issuer/credential')
        .send({
          claims: {
            name: 'Jayden Doe',
          },
        })
        .set('Accept', 'application/json');
      expect(res).toBeDefined();
      expect(res.body).toBeDefined();
      const vc = res.body;
      expect(vc.credentialSubject).toEqual({
        name: 'Jayden Doe',
      });
    });
  });
});
