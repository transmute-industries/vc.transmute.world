const config = {
  issuer: 'did:example:transmute',
  // To generate a new key, see: https://github.com/digitalbazaar/vc-js#generating-keys-and-suites
  keyPairInfo: {
    passphrase: null,
    id: 'https://example.edu/issuers/keys/1',
    controller: 'https://example.com/i/carol',
    type: 'Ed25519VerificationKey2018',
    privateKeyBase58:
      '2vTiMjLEFZjEXBomWDigpYAF1g28Ke3FV8T3rXdEnWGcJzfhdZbQZKmt26ii68NzNbtpyDHZHFNVVJqafhFqpHZ6',
    publicKeyBase58: '7LHR7ejGc8gTwL7uWyZFv3iBYjpapgsVLGzSmUpf767W',
  },
};

module.exports = config;
