const jsonld = require('jsonld');
const fetch = require('node-fetch');

const getJson = async url =>
  fetch(url, {
    headers: {
      Accept: 'application/ld+json',
    },
    method: 'get',
  }).then(data => data.json());
module.exports = async url => {
  if (url.startsWith('did:')) {
    if (url.startsWith('did:web:')) {
      const domain = url
        .split('did:web:')[1]
        .split('#')
        .shift();
      const didDocument = await getJson(
        `https://${domain}/.well-known/did.json`
      );
      return {
        contextUrl: null, // this is for a context via a link header
        document: didDocument, // this is the actual document that was loaded
        documentUrl: url, // this is the actual context URL after redirects
      };
    }
    // TODO: use universal resolver when possible
    const baseUrl = 'https://uniresolver.io/1.0/identifiers/';
    const result = await getJson(baseUrl + url);
    const { didDocument } = result;
    return {
      contextUrl: null, // this is for a context via a link header
      document: didDocument, // this is the actual document that was loaded
      documentUrl: url, // this is the actual context URL after redirects
    };
  }
  try {
    // console.log('downloading...', url);
    const res = await jsonld.documentLoader(url);
    return res;
  } catch (e) {
    // eslint-disable-next-line
    console.error(`No remote context support for ${url}`);
  }
  throw new Error(`No custom context support for ${url}`);
};
