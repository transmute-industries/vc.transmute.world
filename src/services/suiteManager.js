const {
  JsonWebSignature2020,
  JsonWebKeyLinkedDataKeyClass2020,
} = require('lds-jws2020');
const jsigs = require('jsonld-signatures');
const { Ed25519KeyPair } = require('crypto-ld');
const privateKey = require('./privateKey.json');

const { Ed25519Signature2018 } = jsigs.suites;
const didDoc = require('./did.json');
const didDocJwks = require('./didDocJwks.json');

const getPrivateKeyJwk = kid => {
  return didDocJwks.keys.find(k => {
    return k.kid === kid;
  });
};

const getVerificationMethod = verificationMethod => {
  return didDoc.publicKey.find(k => {
    return k.id === verificationMethod;
  });
};

const getKey = verificationMethod => {
  const verificationMethodPublicKey = getVerificationMethod(verificationMethod);
  switch (verificationMethod) {
    case 'did:web:vc.transmute.world#z6MksHh7qHWvybLg5QTPPdG2DgEjjduBDArV9EF9mRiRzMBN':
      return new Ed25519KeyPair({
        ...privateKey,
        ...verificationMethodPublicKey,
      });
    case verificationMethodPublicKey.id: {
      const privateKeyJwk = getPrivateKeyJwk(
        verificationMethodPublicKey.publicKeyJwk.kid
      );
      return new JsonWebKeyLinkedDataKeyClass2020({
        ...verificationMethodPublicKey,
        privateKeyJwk,
      });
    }
    default:
      throw new Error(`No Key for: ${verificationMethod}`);
  }
};

const getSuite = options => {
  const verificationMethod = getVerificationMethod(options.verificationMethod);
  const key = getKey(options.verificationMethod);

  switch (verificationMethod.type) {
    case 'Ed25519VerificationKey2018':
      return new Ed25519Signature2018({
        key,
        date: options.issuanceDate,
      });
    case 'JwsVerificationKey2020':
      return new JsonWebSignature2020({
        LDKeyClass: JsonWebKeyLinkedDataKeyClass2020,
        linkedDataSigantureType: 'JsonWebSignature2020',
        linkedDataSignatureVerificationKeyType: 'JwsVerificationKey2020',
        key,
        date: options.issuanceDate,
      });
    default:
      throw new Error(`No Suite for: ${options.verificationMethod}`);
  }
};

module.exports = {
  getKey,
  getSuite,
};
