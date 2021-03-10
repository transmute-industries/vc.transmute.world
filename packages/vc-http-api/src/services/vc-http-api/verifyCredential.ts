import { ld as vc } from '@transmute/vc.js';
import { Ed25519Signature2018 } from '@transmute/ed25519-signature-2018';
import { BbsBlsSignature2020 } from '@mattrglobal/jsonld-signatures-bbs';

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
    BbsBlsSignature2020: new BbsBlsSignature2020(),
    Ed25519Signature2018: new Ed25519Signature2018(),
  };

  let opts: any = {
    credential: verifiableCredential,
    suite: suiteMap[verifiableCredential.proof.type],
    documentLoader,
  };

  if (verifiableCredential.credentialStatus) {
    opts = { ...opts, checkStatus };
  }
  const result = await vc.verifyCredential({
    ...opts,
  });

  if (result.verified) {
    return {
      checks: options.checks,
      warnings: [],
      errors: [],
    };
  }
  if (!result.statusResult) {
    return {
      checks: options.checks,
      warnings: [],
      errors: ['credentialStatus'],
    };
  }

  throw new Error(JSON.stringify(result, null, 2));
};
