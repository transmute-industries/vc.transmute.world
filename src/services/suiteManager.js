const {
  JsonWebSignature2020,
  JsonWebKeyLinkedDataKeyClass2020,
} = require('lds-jws2020');
const jsigs = require('jsonld-signatures');
const { Ed25519KeyPair } = require('crypto-ld');

const { Ed25519Signature2018 } = jsigs.suites;

const unlockedDIDs = require('./unlockedDIDs');

const getUnclockedVerificationMethod = verificationMethod => {
  let unlockedVerificationMethod;
  Object.values(unlockedDIDs).forEach(didDocument => {
    const bucket = didDocument.publicKey || didDocument.assertionMethod;
    bucket.forEach(publicKey => {
      if (publicKey.id === verificationMethod) {
        unlockedVerificationMethod = publicKey;
      }
    });
  });
  return unlockedVerificationMethod;
};

const getKey = verificationMethod => {
  const verificationMethodPublicKey = getUnclockedVerificationMethod(
    verificationMethod
  );
  switch (verificationMethodPublicKey.type) {
    case 'Ed25519VerificationKey2018':
      return new Ed25519KeyPair({
        ...verificationMethodPublicKey,
      });
    case 'JwsVerificationKey2020': {
      return new JsonWebKeyLinkedDataKeyClass2020({
        ...verificationMethodPublicKey,
      });
    }
    default:
      throw new Error(`No Key for: ${verificationMethod}`);
  }
};

const getSuite = options => {
  const verificationMethod = getUnclockedVerificationMethod(
    options.verificationMethod
  );
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
