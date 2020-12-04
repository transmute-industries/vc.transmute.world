import supertest, { SuperTest } from 'supertest';

import fs from 'fs';
import path from 'path';
import { getTestServer } from '../server';

import { verifiableCredentials } from '../__fixtures__';
import credential from '../data/c.json';

let api: SuperTest<any>;
let server: any;

beforeAll(async () => {
  server = await getTestServer();
  api = supertest(server.server);
});

afterAll(async () => {
  await server.close();
});

it('can generate solution to verifier 2', async () => {
  let response = await api.post('/v0.1.0/issue/credentials').send({
    credential: {
      ...credential,
      issuer: verifiableCredentials[0].issuer,
      credentialSubject: {
        ...credential.credentialSubject,
        id: verifiableCredentials[1].issuer,
      },
    },
    options: {
      proofPurpose: 'assertionMethod',
      assertionMethod: verifiableCredentials[0].proof.verificationMethod,
    },
  });

  response = await api.post('/v0.1.0/prove/presentations').send({
    presentation: {
      '@context': ['https://www.w3.org/2018/credentials/v1'],
      type: ['VerifiablePresentation'],
      holder: verifiableCredentials[2].issuer,
      verifiableCredential: [response.body],
    },
    options: {
      domain: 'issuer.example.com',
      challenge: '99612b24-63d9-11ea-b99f-4f66f3e4f81a',
      proofPurpose: 'authentication',
      verificationMethod: verifiableCredentials[2].proof.verificationMethod,
    },
  });
  fs.writeFileSync(
    path.resolve(__dirname, `../__fixtures__/vp-verifier-2.json`),
    JSON.stringify(response.body, null, 2)
  );
});
