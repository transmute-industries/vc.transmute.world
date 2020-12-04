import verifiableCredential from '../test-vectors/verifiableCredential.json';

import { runVerifierTests } from './runVerifierTests';

const verifyCredentialEndpoint =
  'http://localhost:8080/v0.1.0/verify/credentials';

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
