import credential from '../test-vectors/credential.json';

import { runIssuerTests } from './runIssuerTests';

const issuerEndpoint = 'http://localhost:8080/v0.1.0/issue/credentials';

describe('Issuer Conformance Tests', () => {
  runIssuerTests(issuerEndpoint, credential);
});
