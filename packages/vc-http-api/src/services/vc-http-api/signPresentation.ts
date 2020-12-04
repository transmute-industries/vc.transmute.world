import { ld as vc } from '@transmute/vc.js';
import { Ed25519Signature2018 } from '@transmute/ed25519-signature-2018';
import { Ed25519KeyPair } from '@transmute/did-key-ed25519';
import { documentLoader } from '../documentLoader';

import { k0, getKeyPairById } from '../../keys';

export const signPresentation = async (presentation: any, options: any) => {
  // use options to look up key.
  const k: any = getKeyPairById(options.verificationMethod || k0.id);

  const suite = new Ed25519Signature2018({
    key: await Ed25519KeyPair.from(k),
  });
  const result = await vc.signPresentation({
    presentation,
    suite,
    challenge: options.challenge,
    domain: options.domain,
    documentLoader,
  });

  return result;
};
