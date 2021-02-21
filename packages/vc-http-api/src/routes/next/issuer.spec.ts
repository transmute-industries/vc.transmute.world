import supertest, { SuperTest } from 'supertest';

import { getTestServer } from '../../server';

let api: SuperTest<any>;
let server: any;

beforeAll(async () => {
  server = await getTestServer();
  api = supertest(server.server);
});

afterAll(async () => {
  await server.close();
});

let credentialTemplate = require('../../__interop__/credentials/case-1.json');

describe('POST /next/credentials/issue', () => {
  it('should issue a verifiable credential', async () => {
    const response = await api.post('/next/credentials/issue').send({
      credential: {
        ...credentialTemplate,
        '@context': [
          ...credentialTemplate['@context'],
          'https://w3id.org/bbs/v1',
        ],
        issuer:
          'did:key:z5TcF9K5jTimwCWUpfkkPzdvF9xSPjRcvdMqeYWy6grZhbm8CoAdR1vos6rQzrLjm1oCjD7hoxknNk2BMrpoC8iUpAZswGm2BrkoxsNUqVFtfoNBdCtFCXduzeYZZDs5sJzdsgktZzPRfRLRGnwCV4trjYqpRZa4TYQeWG2e6HqpLynmcx3SJLuEZ2YnCdJHznRA3Ayyt',
      },
      options: {
        assertionMethod:
          'did:key:z5TcF9K5jTimwCWUpfkkPzdvF9xSPjRcvdMqeYWy6grZhbm8CoAdR1vos6rQzrLjm1oCjD7hoxknNk2BMrpoC8iUpAZswGm2BrkoxsNUqVFtfoNBdCtFCXduzeYZZDs5sJzdsgktZzPRfRLRGnwCV4trjYqpRZa4TYQeWG2e6HqpLynmcx3SJLuEZ2YnCdJHznRA3Ayyt#zUC75ReHuHnjbU5w4XNgrU13ZR6GN1JxVVwWyNkijuvG49A19Bg7XMqQhNoYZjB7v9nRdZfNqJcusvkhvUZjK4FoikAdRUjgF9Komr6XwfLjDfhgenBTHxfhM85d7z5rJRcKnZQ',
      },
    });
    expect(response.body.proof.type).toBe('BbsBlsSignature2020');
  });
});
