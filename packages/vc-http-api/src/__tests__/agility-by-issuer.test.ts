import supertest, { SuperTest } from 'supertest';

import { getTestServer } from '../server';

let api: SuperTest<any>;
let server: any;

beforeAll(async () => {
  server = await getTestServer();
  api = supertest(server.server);
});

afterAll(async () => {
  await server.close();
});

it('case bbs', async () => {
  // eslint-disable-next-line global-require
  const credential = require('../__interop__/verifiableCredentials/case-12.json');
  delete credential.proof;
  const response = await api.post('/next/credentials/issue').send({
    credential: {
      ...credential,
      issuer:
        'did:key:z5TcF9K5jTimwCWUpfkkPzdvF9xSPjRcvdMqeYWy6grZhbm8CoAdR1vos6rQzrLjm1oCjD7hoxknNk2BMrpoC8iUpAZswGm2BrkoxsNUqVFtfoNBdCtFCXduzeYZZDs5sJzdsgktZzPRfRLRGnwCV4trjYqpRZa4TYQeWG2e6HqpLynmcx3SJLuEZ2YnCdJHznRA3Ayyt',
    },
  });
  expect(response.body.proof.type).toBe('BbsBlsSignature2020');
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
