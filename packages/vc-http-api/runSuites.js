const { testRunner } = require('./dist');

(async () => {
  console.log('🧙‍♂️ running jest suites.\n');
  await testRunner({
    name: 'Transmute',
    issueCredentialConfiguration: [
      {
        id: 'did:key:z6MkjRagNiMu91DduvCvgEsqLZDVzrJzFrwahc4tXLt9DoHd',
        endpoint: 'https://vc.transmute.world/v0.1.0/issue/credentials',
        options: {
          assertionMethod:
            'did:key:z6MkjRagNiMu91DduvCvgEsqLZDVzrJzFrwahc4tXLt9DoHd#z6MkjRagNiMu91DduvCvgEsqLZDVzrJzFrwahc4tXLt9DoHd',
        },
      },
    ],
    verifyCredentialConfiguration: {
      endpoint: 'https://vc.transmute.world/v0.1.0/verify/credentials',
      didMethodsSupported: [
        'did:key:',
        'did:web:',
        'did:factom',
        'did:elem:ropsten:',
      ],
      linkedDataProofSuitesSupported: ['Ed25519Signature2018'],
    },
    verifyPresentationConfiguration: {
      endpoint: 'https://vc.transmute.world/v0.1.0/verify/presentations',
    },
    credentials: require('./src/__interop__/credentials'),
    verifiableCredentials: require('./src/__interop__/verifiableCredentials'),
    verifiablePresentations: require('./src/__interop__/verifiablePresentations'),
  });
})();
