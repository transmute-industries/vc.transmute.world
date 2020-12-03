import credential from '../test-vectors/credential.json';

const issuerEndpoint = 'http://localhost:8080/v0.1.0/issue/credentials';

import { runIssuerTests } from './runIssuerTests';

describe('Issuer Conformance Tests', () => {
  runIssuerTests(issuerEndpoint, credential);
});
