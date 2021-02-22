/* eslint-disable global-require */
import defaultSuiteConfig from '../vendors/transmute';

import * as httpClient from '../../services/httpClient';

const suiteConfig: any = (global as any).suiteConfig || defaultSuiteConfig;

if (suiteConfig.deriveCredentialConfiguration) {
  describe('Derive Credential API - Conformance', () => {
    // Load in the static test fixtures
    const { verifiableCredentials } = suiteConfig;

    // Deal with possible polymorphic issuer configuration
    const deriveCredentialConfiguration = Array.isArray(
      suiteConfig.deriveCredentialConfiguration
    )
      ? suiteConfig.deriveCredentialConfiguration
      : [suiteConfig.deriveCredentialConfiguration];

    deriveCredentialConfiguration.forEach((value: any) => {
      describe(`with holder: ${value.id}`, () => {
        it("1. The Holder's deriveCredential HTTP API MUST return a 201 HTTP response status code after successful credential derivation.", async () => {
          const firstDerivableCredential = verifiableCredentials
            .map((item: any) => item.data)
            .find((vc: any) => {
              return vc.proof.type === 'BbsBlsSignature2020';
            });

          const body = {
            verifiableCredential: firstDerivableCredential,
            frame: value.frame,
          };

          const res = await httpClient.postJson(value.endpoint, body, {});
          expect(res.status).toBe(201);
          expect(res.body.proof.type).toBe('BbsBlsSignatureProof2020');
        });
      });
    });
  });
}
