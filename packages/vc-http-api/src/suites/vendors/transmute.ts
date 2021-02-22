/* eslint-disable global-require */

const {
  credentials,
  frames,
  verifiableCredentials,
  verifiablePresentations,
} = require('../../__interop__');

export default {
  name: 'Transmute',
  issueCredentialConfiguration: [
    {
      id: 'did:key:z6MkjRagNiMu91DduvCvgEsqLZDVzrJzFrwahc4tXLt9DoHd',
      endpoint: 'https://vc.transmute.world/next/credentials/issue',
      options: {
        assertionMethod:
          'did:key:z6MkjRagNiMu91DduvCvgEsqLZDVzrJzFrwahc4tXLt9DoHd#z6MkjRagNiMu91DduvCvgEsqLZDVzrJzFrwahc4tXLt9DoHd',
      },
    },
  ],
  provePresentationConfiguration: [
    {
      id: 'did:key:z6MkjRagNiMu91DduvCvgEsqLZDVzrJzFrwahc4tXLt9DoHd',
      endpoint: 'https://vc.transmute.world/next/presentations/prove',
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
      endpoint: 'https://vc.transmute.world/next/credentials/derive',
      frame: frames[0].data,
    },
  ],
  verifyPresentationConfiguration: {
    endpoint: 'https://vc.transmute.world/next/presentations/verify',
  },
  credentials,
  verifiableCredentials,
  verifiablePresentations: verifiablePresentations.map(
    (item: any) => item.data
  ),
};
