const request = require('supertest');
const app = require('../app');

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
        .send({
          issuer: 'did:example:76e12ec712ebc6f1c221ebfeb1f',
          subject: 'did:example:ebfeb1f712ebc6f1c276e12ec21',
          expirationDate: '2011-01-01T19:23:24Z',
          claims: {
            name: 'Jayden Doe',
          },
        })
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

    it('should include the issuanceDate provided if provided', async () => {
      const res = await request(app)
        .post('/api/issuer/credential')
        .send({
          issuanceDate: '2010-01-01T19:23:24Z',
        })
        .set('Accept', 'application/json');
      expect(res).toBeDefined();
      expect(res.body).toBeDefined();
      const vc = res.body;
      expect(vc.issuanceDate).toEqual('2010-01-01T19:23:24Z');
    });
  });
});
