const request = require('supertest');
const vcjs = require('vc-js');
const jsonld = require('jsonld');
const {
  Ed25519KeyPair,
  suites: { Ed25519Signature2018 },
} = require('jsonld-signatures');
const app = require('../app');
const config = require('../config');

describe('Issuer Credential API', () => {
  let vc;

  describe('POST /credential', () => {
    it('should return a verifiable credential', async () => {
      const res = await request(app)
        .post('/api/issuer/credential')
        .send()
        .set('Accept', 'application/json');
      expect(res).toBeDefined();
      expect(res.body).toBeDefined();
      vc = res.body;
      expect(vc['@context']).toEqual([
        'https://www.w3.org/2018/credentials/v1',
        'https://www.w3.org/2018/credentials/examples/v1',
      ]);
      expect(vc.id).toContain('http://example.com/credentials/');
      expect(vc.type).toEqual(['VerifiableCredential']);
      expect(vc.issuanceDate).toBeDefined();
      expect(vc.issuer).toBe(config.issuer);
      expect(vc.credentialSubject).toEqual({
        id: 'did:example:subject',
      });
      expect(vc.proof).toBeDefined();
    });

    it('should have a verifiable linked data proof', async () => {
      const keyPair = await Ed25519KeyPair.from(config.keyPairInfo);
      const suite = new Ed25519Signature2018({
        verificationMethod: keyPair.id,
        key: keyPair,
      });
      const documentLoader = async url => {
        if (url === config.keyPairInfo.controller) {
          return {
            contextUrl: null,
            documentUrl: url,
            document: {
              [keyPair.controller]: {
                '@context': 'https://w3id.org/security/v2',
                id: keyPair.controller,
                assertionMethod: [keyPair.id],
              },
            },
          };
        }
        return jsonld.documentLoaders.node()(url);
      };
      const result = await vcjs.verify({
        credential: vc,
        suite,
        documentLoader,
      });
      expect(result.verified).toBeTruthy();
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
      vc = res.body;
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
      vc = res.body;
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
      vc = res.body;
      expect(vc.credentialSubject).toEqual({
        id: 'did:example:subject',
        name: 'Jayden Doe',
      });
    });
  });
});
