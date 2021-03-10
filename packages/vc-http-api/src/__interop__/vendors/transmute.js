const {
  credentials,
  frames,
  verifiableCredentials,
  verifiablePresentations,
} = require('../index');

module.exports = {
  name: 'Transmute',
  issueCredentialConfiguration: [
    {
      id: 'did:key:z6MkjRagNiMu91DduvCvgEsqLZDVzrJzFrwahc4tXLt9DoHd',
      endpoint: 'http://localhost:8080/next/credentials/issue',
      options: {
        assertionMethod:
          'did:key:z6MkjRagNiMu91DduvCvgEsqLZDVzrJzFrwahc4tXLt9DoHd#z6MkjRagNiMu91DduvCvgEsqLZDVzrJzFrwahc4tXLt9DoHd',
      },
    },
  ],
  provePresentationConfiguration: [
    {
      id: 'did:key:z6MkjRagNiMu91DduvCvgEsqLZDVzrJzFrwahc4tXLt9DoHd',
      endpoint: 'http://localhost:8080/next/presentations/prove',
      options: {
        authentication:
          'did:key:z6MkjRagNiMu91DduvCvgEsqLZDVzrJzFrwahc4tXLt9DoHd#z6MkjRagNiMu91DduvCvgEsqLZDVzrJzFrwahc4tXLt9DoHd',
      },
    },
  ],
  deriveCredentialConfiguration: [
    {
      id:
        'did:key:z5TcF9K5jTimwCWUpfkkPzdvF9xSPjRcvdMqeYWy6grZhbm8CoAdR1vos6rQzrLjm1oCjD7hoxknNk2BMrpoC8iUpAZswGm2BrkoxsNUqVFtfoNBdCtFCXduzeYZZDs5sJzdsgktZzPRfRLRGnwCV4trjYqpRZa4TYQeWG2e6HqpLynmcx3SJLuEZ2YnCdJHznRA3Ayyt',
      endpoint: 'http://localhost:8080/next/credentials/derive',
      frame: frames[0].data,
    },
  ],

  verifyCredentialConfiguration: {
    endpoint: 'http://localhost:8080/next/credentials/verify',
    didMethodsSupported: ['did:key:', 'did:web:'],
    linkedDataProofSuitesSupported: [
      'Ed25519Signature2018',
      'BbsBlsSignature2020',
      'BbsBlsSignatureProof2020',
    ],
  },

  verifyPresentationConfiguration: {
    endpoint: 'http://localhost:8080/next/presentations/verify',
  },
  credentials,
  verifiableCredentials,
  verifiablePresentations: verifiablePresentations.map(item => item.data),
};
