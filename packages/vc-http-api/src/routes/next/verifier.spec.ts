import supertest, { SuperTest } from 'supertest';

import { getTestServer } from '../../server';

let api: SuperTest<any>;
let server: any;

beforeAll(async () => {
  server = await getTestServer();
  api = supertest(server.server);
});

afterAll(async () => {
  await server.close();
});

const vp = require('../../__interop__/verifiablePresentations/case-2.json');

describe('POST /next/presentations/verify', () => {
  it('should verify a verifiable presentation', async () => {
    const response = await api.post('/next/presentations/verify').send({
      verifiablePresentation: vp,
      options: {
        domain: vp.proof.domain,
        challenge: vp.proof.challenge,
      },
    });
    expect(response.body).toEqual({
      checks: ['proof'],
      warnings: [],
      errors: [],
    });
  });

  it('should verify a verifiable presentation without a proof', async () => {
    let vpWithoutProof = { ...vp };
    delete vpWithoutProof.proof;
    delete vpWithoutProof.holder;
    const response = await api.post('/next/presentations/verify').send({
      verifiablePresentation: vpWithoutProof,
      options: {},
    });
    expect(response.body).toEqual({
      checks: ['proof'],
      warnings: [],
      errors: [],
    });
  });

  it('should fail to verify a tampered verifiable presentation', async () => {
    const response = await api.post('/next/presentations/verify').send({
      verifiablePresentation: { ...vp, foo: '123' },
      options: {
        domain: vp.proof.domain,
        challenge: vp.proof.challenge,
      },
    });
    expect(response.body).toEqual({
      checks: ['proof'],
      warnings: [],
      errors: ['proof'],
    });
  });

  it('should fail to verify an unsigned presentation with tampered verifiable credentials', async () => {
    let vpWithoutProof = { ...vp };
    delete vpWithoutProof.proof;
    delete vpWithoutProof.holder;
    vpWithoutProof.verifiableCredential[0].name = 'bar';
    const response = await api.post('/next/presentations/verify').send({
      verifiablePresentation: vpWithoutProof,
      options: {},
    });
    expect(response.body).toEqual({
      checks: ['proof'],
      warnings: [],
      errors: ['proof'],
    });
  });
});
