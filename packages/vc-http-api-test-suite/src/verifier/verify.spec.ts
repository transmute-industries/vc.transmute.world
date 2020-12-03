import verifiableCredential from '../test-vectors/verifiableCredential.json';

const verifyCredentialEndpoint =
  'http://localhost:8080/v0.1.0/verify/credentials';

import { runVerifierTests } from './runVerifierTests';

describe('Verifier Conformance Tests', () => {
  const validRequestBody = {
    verifiableCredential,
    options: {
      checks: ['proof'],
    },
  };
  runVerifierTests({
    verifyCredentialEndpoint,
    verifiableCredential,
    validRequestBody,
  });
});
