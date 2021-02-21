import { ld as vc } from '@transmute/vc.js';
import { Ed25519Signature2018 } from '@transmute/ed25519-signature-2018';
import {
  BbsBlsSignature2020,
  Bls12381G2KeyPair,
} from '@mattrglobal/jsonld-signatures-bbs';

import { Ed25519KeyPair } from '@transmute/did-key-ed25519';
import { documentLoader } from '../documentLoader';

import { getKeyPairById, k0 } from '../../keys';

export const issueCredential = async (
  credential: any,
  options: any = { proofPurpose: 'assertionMethod', assertionMethod: k0.id }
) => {
  if (options.proofPurpose && options.proofPurpose !== 'assertionMethod') {
    throw new Error('unsupported proofPurpose');
  }

  // use options to look up key.
  const k: any = getKeyPairById(options.assertionMethod || k0.id);

  if (!k) {
    throw new Error('unsupported assertionMethod');
  }
  let suite: any;

  if (k.type === 'Bls12381G2Key2020') {
    suite = new BbsBlsSignature2020({
      key: await Bls12381G2KeyPair.from(k),
    });
  }

  if (
    k.type === 'Ed25519VerificationKey2018' ||
    (k.publicKeyJwk && k.publicKeyJwk.crv === 'Ed25519')
  ) {
    suite = new Ed25519Signature2018({
      key: await Ed25519KeyPair.from(k),
    });
  }

  const verifiableCredential = await vc.issue({
    credential: { ...credential },
    suite,
    documentLoader,
  });
  return verifiableCredential;
};
