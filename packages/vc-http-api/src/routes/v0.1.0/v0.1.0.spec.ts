import supertest, { SuperTest } from 'supertest';

import { getTestServer } from '../../server';

import credential from '../../data/c.json';
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

describe('POST /v0.1.0/issue/credentials', () => {
  it('should issue a verifiable credential', async () => {
    const response = await api.post('/v0.1.0/issue/credentials').send({
      credential: credential,
      options: {
        verificationMethod: verifiableCredential.proof.verificationMethod,
      },
    });
    expect(response.body.proof).toBeDefined();
  });
});

describe('POST /v0.1.0/prove/presentations', () => {
  it('should prove a verifiable credential', async () => {
    const credential: any = { ...verifiableCredential };
    const response = await api.post('/v0.1.0/prove/presentations').send({
      presentation: {
        '@context': ['https://www.w3.org/2018/credentials/v1'],
        type: ['VerifiablePresentation'],
        holder: 'did:key:z6MkjRagNiMu91DduvCvgEsqLZDVzrJzFrwahc4tXLt9DoHd',
        verifiableCredential: [credential],
      },
      options: {
        domain: 'issuer.example.com',
        challenge: '99612b24-63d9-11ea-b99f-4f66f3e4f81a',
        proofPurpose: 'authentication',
        verificationMethod: verifiableCredential.proof.verificationMethod,
      },
    });
    expect(response.body.proof).toBeDefined();
  });
});

describe('POST /v0.1.0/verify/credentials', () => {
  it('should verify a verifiable credential', async () => {
    const response = await api.post('/v0.1.0/verify/credentials').send({
      verifiableCredential,
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

describe('POST /v0.1.0/verify/presentations', () => {
  it('should verify a verifiable presentation', async () => {
    const response = await api.post('/v0.1.0/verify/presentations').send({
      verifiablePresentation,
      options: {
        domain: verifiablePresentation.proof.domain,
        challenge: verifiablePresentation.proof.challenge,
      },
    });
    expect(response.body).toEqual({
      checks: ['proof'],
      warnings: [],
      errors: [],
    });
  });
});
