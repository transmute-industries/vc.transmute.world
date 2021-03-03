import {
  documentLoaderFactory,
  contexts
} from "@transmute/jsonld-document-loader";
import { driver } from "@transmute/did-key-ed25519";
import * as bls12381 from "@transmute/did-key-bls12381";
import citizenshipV1 from "../contexts/citizenship-v1.json";
import v1 from "../contexts/v1.json";
import didv011 from "../contexts/did-v0.11.json";
import sidetreev01 from "../contexts/sidetree-v0.1.json";
import didConfig from "../contexts/did-configuration-v0.2.json";
import vaccinationV1 from "../contexts/vaccination-v1.json";
import traceabilityV1 from "../contexts/traceability-v1.json";
import bbsV1 from "../contexts/bbs-v1.json";
import secV3 from "../contexts/sec-v3.json";

const documentLoader = documentLoaderFactory.pluginFactory
  .build({
    contexts: {
      ...contexts.W3C_Decentralized_Identifiers,
      ...contexts.W3C_Verifiable_Credentials,
      ...contexts.W3ID_Security_Vocabulary
    }
  })
  .addContext({
    "https://docs.element-did.com/contexts/sidetree/sidetree-v0.1.jsonld": sidetreev01,
    "https://w3c-ccg.github.io/ldp-bbs2020/context/v1": bbsV1,
    "https://w3id.org/bbs/v1": bbsV1,
    "https://w3id.org/citizenship/v1": citizenshipV1,
    "https://w3id.org/veres-one/v1": v1,
    "https://w3id.org/did/v0.11": didv011,
    "https://identity.foundation/.well-known/contexts/did-configuration-v0.2.jsonld": didConfig,
    "https://w3id.org/vaccination/v1": vaccinationV1,
    "https://w3id.org/traceability/v1": traceabilityV1,
    "https://w3id.org/security/v3-unstable": secV3
  })
  .addResolver({
    "did:key:z6": {
      resolve: async uri => {
        const { didDocument } = await driver.resolve(uri, {
          accept: "application/did+ld+json"
        });
        return didDocument;
      }
    },
    "did:key:z5Tc": {
      resolve: async uri => {
        const { didDocument } = await bls12381.driver.resolve(uri, {
          accept: "application/did+ld+json"
        });
        return didDocument;
      }
    }
  })
  .buildDocumentLoader();

export { documentLoader };
