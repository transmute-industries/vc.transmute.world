import {
  BbsBlsSignatureProof2020,
  deriveProof,
} from '@mattrglobal/jsonld-signatures-bbs';

import { documentLoader } from '../documentLoader';

export const deriveCredential = async (
  verifiableCredential: any,
  frame: any
) => {
  if (verifiableCredential.proof.type !== 'BbsBlsSignature2020') {
    throw new Error('BbsBlsSignature2020 is required for derviveCredential');
  }
  const suite = new BbsBlsSignatureProof2020();
  const result = await deriveProof(verifiableCredential, frame, {
    suite,
    documentLoader,
  });

  return result;
};
