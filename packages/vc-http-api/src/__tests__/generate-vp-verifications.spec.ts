import supertest, { SuperTest } from 'supertest';

import { getTestServer } from '../server';

import fs from 'fs';
import path from 'path';

import { verifiablePresentations } from '../__fixtures__';

let api: SuperTest<any>;
let server: any;

beforeAll(async () => {
  server = await getTestServer();
  api = supertest(server.server);
});

afterAll(async () => {
  await server.close();
});

describe('can verify vc from', () => {
  verifiablePresentations.forEach((vp, i) => {
    it(vp.holder, async () => {
      const response = await api.post('/v0.1.0/verify/presentations').send({
        verifiablePresentation: vp,
        options: {
          domain: vp.proof.domain,
          challenge: vp.proof.challenge,
        },
      });
      fs.writeFileSync(
        path.resolve(__dirname, `../__fixtures__/vp${i}-verification.json`),
        JSON.stringify(response.body, null, 2)
      );
    });
  });
});
