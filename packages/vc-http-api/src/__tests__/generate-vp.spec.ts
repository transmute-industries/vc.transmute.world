import supertest, { SuperTest } from 'supertest';

import fs from 'fs';
import path from 'path';
import { getTestServer } from '../server';

import { verifiableCredentials } from '../__fixtures__';

let api: SuperTest<any>;
let server: any;

beforeAll(async () => {
  server = await getTestServer();
  api = supertest(server.server);
});

afterAll(async () => {
  await server.close();
});

describe('can sign presentation from', () => {
  verifiableCredentials.forEach((vc, i) => {
    it(vc.issuer, async () => {
      const response = await api.post('/v0.1.0/prove/presentations').send({
        presentation: {
          '@context': ['https://www.w3.org/2018/credentials/v1'],
          type: ['VerifiablePresentation'],
          holder: vc.issuer,
          verifiableCredential: [vc],
        },
        options: {
          domain: 'issuer.example.com',
          challenge: '99612b24-63d9-11ea-b99f-4f66f3e4f81a',
          proofPurpose: 'authentication',
          verificationMethod: vc.proof.verificationMethod,
        },
      });
      fs.writeFileSync(
        path.resolve(__dirname, `../__fixtures__/vp${i}.json`),
        JSON.stringify(response.body, null, 2)
      );
    });
  });
});
