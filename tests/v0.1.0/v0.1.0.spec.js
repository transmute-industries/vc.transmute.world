// const fs = require('fs');
// const path = require('path');
const request = require('supertest');

const { getFastify } = require('../../src/factory');
const config = require('../../src/config');

const fixtures = require('../__fixtures__');

const opts = {
  logger: false,
  config,
};

const { fastify } = getFastify(opts);

let tester;

jest.setTimeout(10 * 1000);

beforeAll(async () => {
  await fastify.ready();
  const port = fastify.svcs.config.fastify_base_url.split(':').pop();
  try {
    await fastify.listen(port);
  } catch (e) {
    // ignore
  }
  tester = request(fastify.server);
});

afterAll(async () => {
  await fastify.close();
});

describe('/v0.1.0', () => {
  Object.keys(fixtures).forEach(useCase => {
    describe(useCase, () => {
      describe('POST /v0.1.0/issue/credentials', () => {
        it('should issue a VC and return it in the response body', async () => {
          const verificationMethod =
            'did:elem:ropsten:EiBJJPdo-ONF0jxqt8mZYEj9Z7FbdC87m2xvN0_HAbcoEg#xqc3gS1gz1vch7R3RvNebWMjLvBOY-n_14feCYRPsUo';
          const bindingModel = {
            ...fixtures[useCase].vcBindingModel,
            issuer: verificationMethod.split('#')[0],
            credentialSubject: {
              ...fixtures[useCase].vcBindingModel.credentialSubject,
              id: verificationMethod.split('#')[0],
            },
          };
          const res = await tester
            .post('/v0.1.0/issue/credentials')
            .set('Accept', 'application/json')
            // eslint-disable-next-line
            .send({
              credential: bindingModel,
              options: {
                assertionMethod: verificationMethod,
              },
            });
          expect(res.status).toBe(201);
          expect(res.body.proof).toBeDefined();
          // console.log(JSON.stringify(vc, null, 2));
          // eslint-disable-next-line
          // fs.writeFileSync(
          //   path.resolve(__dirname, '../__fixtures__/vc.json'),
          //   JSON.stringify(vc, null, 2)
          // );
        });
      });

      describe('POST /v0.1.0/prove/presentations', () => {
        it('should create a VP (with proof) and return it in the response body', async () => {
          const verificationMethod =
            'did:elem:ropsten:EiBJJPdo-ONF0jxqt8mZYEj9Z7FbdC87m2xvN0_HAbcoEg#xqc3gS1gz1vch7R3RvNebWMjLvBOY-n_14feCYRPsUo';

          const res = await tester
            .post('/v0.1.0/prove/presentations')
            .set('Accept', 'application/json')
            // eslint-disable-next-line
            .send({
              presentation: fixtures[useCase].vpBindingModel,
              options: {
                proofPurpose: 'authentication',
                domain: 'issuer.example.com',
                challenge: '99612b24-63d9-11ea-b99f-4f66f3e4f81a',
                verificationMethod,
              },
            });
          expect(res.status).toBe(201);
          expect(res.body.proof).toBeDefined();
          // console.log(JSON.stringify(vp, null, 2));
          // eslint-disable-next-line
          // fs.writeFileSync(
          //   path.resolve(__dirname, '../__fixtures__/vp.json'),
          //   JSON.stringify(vp, null, 2)
          // );
        });
      });

      describe('POST /v0.1.0/verify/credentials', () => {
        it('should return a verification result in the response body for a VC', async () => {
          const res = await tester
            .post('/v0.1.0/verify/credentials')
            .set('Accept', 'application/json')
            .send({ verifiableCredential: fixtures[useCase].vc });

          expect(res.status).toBe(200);
          expect(res.body.checks).toEqual(['proof']);
        });
      });
      describe('POST /v0.1.0/verify/presentations', () => {
        it('should return a verification result in the response body for a VP (with proof)', async () => {
          const body = {
            verifiablePresentation: fixtures[useCase].vp,
            options: {
              domain: 'issuer.example.com',
              challenge: '99612b24-63d9-11ea-b99f-4f66f3e4f81a',
            },
          };
          // console.log(JSON.stringify(body, null, 2))
          const res = await tester
            .post('/v0.1.0/verify/presentations')
            .set('Accept', 'application/json')
            .send(body);

          // console.log(res.body)

          expect(res.status).toBe(200);
          expect(res.body.checks).toEqual(['proof']);
        });

        it('should return a verification result in the response body for a VP (without proof)', async () => {
          // why is this even called verifiable...
          const vpWithoutProof = { ...fixtures[useCase].vp };
          delete vpWithoutProof.proof;
          const res = await tester
            .post('/v0.1.0/verify/presentations')
            .set('Accept', 'application/json')
            .send({ verifiablePresentation: vpWithoutProof });
          // console.log(res.body)
          expect(res.status).toBe(200);
          expect(res.body.checks).toEqual(['proof']);
        });
      });
    });
  });
});
