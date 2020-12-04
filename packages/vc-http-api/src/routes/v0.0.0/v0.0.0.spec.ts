import supertest, { SuperTest } from 'supertest';

import { getTestServer } from '../../server';

import verifiableCredential from '../../data/vc.json';
import verifiablePresentation from '../../data/vp.json';

let api: SuperTest<any>;
let server: any;

beforeAll(async () => {
  server = await getTestServer();
  api = supertest(server.server);
});

afterAll(async () => {
  await server.close();
});

describe('POST /v0.0.0/credentials/issueCredential', () => {
  it('should issue a credential', async () => {
    const credential: any = { ...verifiableCredential };
    delete credential.proof;
    const response = await api
      .post('/v0.0.0/credentials/issueCredential')
      .send({
        credential,
      });
    expect(response.body.proof).toBeDefined();
  });
});

describe('POST /v0.0.0/verifier/credentials', () => {
  it('should verify a credential', async () => {
    const credential: any = { ...verifiableCredential };
    const response = await api.post('/v0.0.0/verifier/credentials').send({
      verifiableCredential: credential,
      options: {
        checks: ['proof'],
      },
    });
    expect(response.body).toEqual({
      checks: ['proof'],
      warnings: [],
      errors: [],
    });
  });
});

describe('POST /v0.0.0/verifier/presentations', () => {
  it('should verify a presentation', async () => {
    const presentation: any = { ...verifiablePresentation };
    const response = await api.post('/v0.0.0/verifier/presentations').send({
      verifiablePresentation: presentation,
      options: {
        checks: ['proof'],
        domain: 'issuer.example.com',
        challenge: '99612b24-63d9-11ea-b99f-4f66f3e4f81a',
        proofPurpose: 'authentication',
        verificationMethod:
          'did:key:z6MkjRagNiMu91DduvCvgEsqLZDVzrJzFrwahc4tXLt9DoHd#z6MkjRagNiMu91DduvCvgEsqLZDVzrJzFrwahc4tXLt9DoHd',
      },
    });
    expect(response.body).toEqual({
      checks: ['proof'],
      warnings: [],
      errors: [],
    });
  });
});
