import { ld as vc } from '@transmute/vc.js';
import { Ed25519Signature2018 } from '@transmute/ed25519-signature-2018';
import { Ed25519KeyPair } from '@transmute/did-key-ed25519';
import { documentLoader } from '../documentLoader';

import { k0 } from '../../keys';

export const issueCredential = async (
  credential: any,
  options: any = { proofPurpose: 'assertionMethod' }
) => {
  if (options.proofPurpose && options.proofPurpose !== 'assertionMethod') {
    throw new Error('unsupported proofPurpose');
  }

  if (options.assertionMethod && options.assertionMethod !== k0.id) {
    throw new Error('unsupported assertionMethod');
  }

  // use options to look up key.
  const suite = new Ed25519Signature2018({
    key: await Ed25519KeyPair.from(k0),
  });
  const verifiableCredential = await vc.issue({
    credential: { ...credential },
    suite,
    documentLoader,
  });
  return verifiableCredential;
};
