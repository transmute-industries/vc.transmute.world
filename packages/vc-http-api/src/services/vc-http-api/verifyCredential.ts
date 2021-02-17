import { ld as vc } from '@transmute/vc.js';
import { Ed25519Signature2018 } from '@transmute/ed25519-signature-2018';
import { documentLoader } from '../documentLoader';

export const verifyCredential = async (
  verifiableCredential: any,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _options: any
) => {
  // eslint-disable-next-line no-console
  // console.warn('not handling options', options);
  try {
    const result = await vc.verifyCredential({
      credential: verifiableCredential,
      suite: new Ed25519Signature2018(),
      documentLoader,
    });

    if (result.verified) {
      return {
        checks: ['proof'],
        warnings: [],
        errors: [],
      };
    }
    console.warn(result);
  } catch (e) {
    console.warn(e);
    // no op
  }

  return {
    checks: ['proof'],
    warnings: [],
    errors: ['proof'],
  };
};
