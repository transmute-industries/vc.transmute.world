import defaultSuiteConfig from './defaultSuiteConfig';
import * as httpClient from '../../services/httpClient';

import { getTestServer } from '../../server';

const suiteConfig: any = (global as any).suiteConfig || defaultSuiteConfig;

let server: any;

beforeAll(async () => {
  server = await getTestServer();
  await server.listen(8080);
});

afterAll(async () => {
  await server.close();
});

if (suiteConfig.provePresentationConfiguration) {
  describe('Prove Presentation API - Conformance', () => {
    // Load in the static test fixtures

    // Deal with possible polymorphic issuer configuration
    const provePresentationConfiguration = Array.isArray(
      suiteConfig.provePresentationConfiguration
    )
      ? suiteConfig.provePresentationConfiguration
      : [suiteConfig.provePresentationConfiguration];

    provePresentationConfiguration.forEach((value: any) => {
      describe(`with holder: ${value.id}`, () => {
        it("1. The Holder's provePresentation HTTP API MUST return a 201 HTTP response status code after successful presentation creation.", async () => {
          const { credentials } = suiteConfig;

          const body = {
            presentation: {
              '@context': ['https://www.w3.org/2018/credentials/v1'],
              type: ['VerifiablePresentation'],
              holder: value.options.id,
              verifiableCredential: [credentials[0].data],
            },
            options: {
              domain: 'issuer.example.com',
              challenge: '99612b24-63d9-11ea-b99f-4f66f3e4f81a',
              proofPurpose: 'authentication',
              verificationMethod: value.options.authentication,
            },
          };

          const res = await httpClient.postJson(value.endpoint, body, {});
          expect(res.status).toBe(201);
          expect(res.body.proof.type).toBe('Ed25519Signature2018');
        });
      });
    });
  });
}
