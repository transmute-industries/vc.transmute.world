import fetch from 'node-fetch';

describe('did-web', () => {
  it('can resolve did web endpoint', async () => {
    const url = 'http://localhost:8080/.well-known/did.json';
    const res = await fetch(url, {
      headers: {
        Accept: 'application/ld+json',
      },
      method: 'get',
    });
    const body = await res.json();
    expect(body['@context']).toBeDefined();
  });
});
