import {
  documentLoaderFactory,
  contexts,
} from '@transmute/jsonld-document-loader';
import { driver } from '@transmute/did-key-ed25519';

import cmtr20 from '../contexts/cmtr-v0.2.json';
import citizenshipV1 from '../contexts/citizenship-v1.json';
import v1 from '../contexts/v1.json';
import didv011 from '../contexts/did-v0.11.json';
import sidetreev01 from '../contexts/sidetree-v0.1.json';
import didConfig from '../contexts/did-configuration-v0.2.json';
import vaccinationV1 from '../contexts/vaccination-v1.json';
import traceabilityV1 from '../contexts/traceability-v1.json';

import d0 from '../did-documents/d0.json';
import d1 from '../did-documents/d1.json';
import d2 from '../did-documents/d2.json';

const documentLoader = documentLoaderFactory.pluginFactory
  .build({
    contexts: {
      ...contexts.W3C_Decentralized_Identifiers,
      ...contexts.W3C_Verifiable_Credentials,
      ...contexts.W3ID_Security_Vocabulary,
    },
  })
  .addContext({
    'https://docs.element-did.com/contexts/sidetree/sidetree-v0.1.jsonld': sidetreev01,
    'https://w3c-ccg.github.io/vc-examples/cmtr/examples/v0.2/cmtr-v0.2.jsonld': cmtr20,
    'https://w3id.org/citizenship/v1': citizenshipV1,
    'https://w3id.org/veres-one/v1': v1,
    'https://w3id.org/did/v0.11': didv011,
    'https://identity.foundation/.well-known/contexts/did-configuration-v0.2.jsonld': didConfig,
    'https://w3id.org/vaccination/v1': vaccinationV1,
    'https://w3id.org/traceability/v1': traceabilityV1,
  })
  .addResolver({
    'did:key:z6': {
      resolve: async uri => {
        const { didDocument } = await driver.resolve(uri, {
          accept: 'application/did+ld+json',
        });
        return didDocument;
      },
    },
    'did:v1:test:nym:z6MkhdmzFu659ZJ4XKj31vtEDmjvsi5yDZG5L7Caz63oP39k': {
      resolve: async () => {
        return d0;
      },
    },
    'did:web:vc.transmute.world': {
      resolve: async () => {
        return d1;
      },
    },
    'did:elem:ropsten:EiBJJPdo-ONF0jxqt8mZYEj9Z7FbdC87m2xvN0_HAbcoEg': {
      resolve: async () => {
        return d2;
      },
    },
  })
  .buildDocumentLoader();

export { documentLoader };
