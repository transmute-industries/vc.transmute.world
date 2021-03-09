import supertest, { SuperTest } from 'supertest';

import { getTestServer } from '../server';

const { postJson } = require('../services/httpClient');

let api: SuperTest<any>;
let server: any;

beforeAll(async () => {
  server = await getTestServer();
  api = supertest(server.server);
  await server.listen(8080);
});

afterAll(async () => {
  await server.close();
});

it('case ed', async () => {
  // eslint-disable-next-line global-require
  const credential = require('../__interop__/verifiableCredentials/case-12.json');
  credential['@context'].push('https://w3id.org/security/bbs/v1');
  delete credential.proof;
  const response = await api.post('/next/credentials/issue').send({
    credential: {
      ...credential,
      issuer: 'did:key:z6MkjRagNiMu91DduvCvgEsqLZDVzrJzFrwahc4tXLt9DoHd',
    },
  });
  expect(response.body.proof.type).toBe('Ed25519Signature2018');
});

it('case ed', async () => {
  // eslint-disable-next-line global-require
  const credential = require('../__interop__/verifiableCredentials/case-12.json');
  credential['@context'].push('https://w3id.org/security/bbs/v1');
  delete credential.proof;
  const response = await postJson(
    'http://localhost:8080/next/credentials/issue',
    {
      credential: {
        ...credential,
        issuer: 'did:key:z6MkjRagNiMu91DduvCvgEsqLZDVzrJzFrwahc4tXLt9DoHd',
      },
    }
  );
  expect(response.status).toBe(201);
  expect(response.body.proof.type).toBe('Ed25519Signature2018');
});
