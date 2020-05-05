const {
  JsonWebSignature2020,
  JsonWebKeyLinkedDataKeyClass2020,
} = require('lds-jws2020');
const fetch = require('node-fetch');
const jsigs = require('jsonld-signatures');
const { Ed25519KeyPair } = require('crypto-ld');

const { Ed25519Signature2018 } = jsigs.suites;

const unlockedDIDs = require('./unlockedDIDs');

const getJson = async url =>
  fetch(url, {
    headers: {
      Accept: 'application/ld+json',
    },
    method: 'get',
  }).then(data => data.json());

const getUnclockedVerificationMethod = async verificationMethod => {
  let unlockedVerificationMethod;
  Object.values(unlockedDIDs).forEach(didDocument => {
    const bucket = didDocument.publicKey || didDocument.assertionMethod;
    bucket.forEach(publicKey => {
      if (publicKey.id === verificationMethod) {
        unlockedVerificationMethod = publicKey;
      }
    });
  });

  if (!unlockedVerificationMethod) {
    const baseUrl = 'https://uniresolver.io/1.0/identifiers/';
    const result = await getJson(baseUrl + verificationMethod);
    const { didDocument } = result;
    const bucket = didDocument.publicKey || didDocument.assertionMethod;
    bucket.forEach(publicKey => {
      if (publicKey.id === verificationMethod) {
        unlockedVerificationMethod = publicKey;
      }
    });
  }
  return unlockedVerificationMethod;
};

const getKey = async verificationMethod => {
  const verificationMethodPublicKey = await getUnclockedVerificationMethod(
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

const getSuite = async options => {
  const vmFromProof = options.verificationMethod || options.assertionMethod;
  const verificationMethod = await getUnclockedVerificationMethod(vmFromProof);
  const key = await getKey(vmFromProof);

  switch (verificationMethod.type) {
    case 'Ed25519VerificationKey2018':
      if (options.jws !== undefined) {
        return new Ed25519Signature2018();
      }
      return new Ed25519Signature2018({
        key,
        date: options.issuanceDate,
      });
    case 'JwsVerificationKey2020':
      if (options.jws !== undefined) {
        return new JsonWebSignature2020({
          LDKeyClass: JsonWebKeyLinkedDataKeyClass2020,
          linkedDataSigantureType: 'JsonWebSignature2020',
          linkedDataSignatureVerificationKeyType: 'JwsVerificationKey2020',
        });
      }
      return new JsonWebSignature2020({
        LDKeyClass: JsonWebKeyLinkedDataKeyClass2020,
        linkedDataSigantureType: 'JsonWebSignature2020',
        linkedDataSignatureVerificationKeyType: 'JwsVerificationKey2020',
        key,
        date: options.issuanceDate,
      });
    default:
      throw new Error(`No Suite for: ${vmFromProof}`);
  }
};

module.exports = {
  getKey,
  getSuite,
};
