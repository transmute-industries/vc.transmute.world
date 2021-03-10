import { ld as vc } from '@transmute/vc.js';
import { Ed25519Signature2018 } from '@transmute/ed25519-signature-2018';
import {
  BbsBlsSignature2020,
  BbsBlsSignatureProof2020,
} from '@mattrglobal/jsonld-signatures-bbs';

import { checkStatus } from '@transmute/vc-status-rl-2020';
import { documentLoader } from '../documentLoader';

export const verifyCredential = async (
  verifiableCredential: any,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  options: any
) => {
  // eslint-disable-next-line no-console
  // console.warn('not handling options', options);

  const suiteMap: any = {
    Ed25519Signature2018: new Ed25519Signature2018(),
    BbsBlsSignature2020: new BbsBlsSignature2020(),
    BbsBlsSignatureProof2020: new BbsBlsSignatureProof2020(),
  };

  let result = { verified: false, statusResult: false };
  try {
    result = await vc.verifyCredential({
      credential: verifiableCredential,
      suite: suiteMap[verifiableCredential.proof.type],
      checkStatus: options.checks.includes('credentialStatus')
        ? checkStatus
        : () => {
            return Promise.resolve({ verified: true });
          },
      documentLoader,
    });
  } catch (e) {
    console.warn(e);
  }

  const res: any = {
    checks: options.checks,
    warnings: [],
    errors: [],
  };

  if (!result.verified) {
    res.errors.push('proof');
  }
  if (verifiableCredential.credentialStatus && !result.statusResult) {
    res.errors.push('credentialStatus');
  }

  return res;
};
