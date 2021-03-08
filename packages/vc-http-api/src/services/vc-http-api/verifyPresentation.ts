import { ld as vc } from '@transmute/vc.js';
import { checkStatus } from '@transmute/vc-status-rl-2020';
import { Ed25519Signature2018 } from '@transmute/ed25519-signature-2018';
import {
  BbsBlsSignature2020,
  BbsBlsSignatureProof2020,
} from '@mattrglobal/jsonld-signatures-bbs';
import { documentLoader } from '../documentLoader';

const suiteMap = {
  Ed25519Signature2018,
  BbsBlsSignature2020,
  BbsBlsSignatureProof2020,
};

export const verifyPresentation = async (
  verifiablePresentation: any,
  options: any
) => {
  let verifyOptions: any = {
    suiteMap,
    documentLoader,
    checkStatus,
  };

  if (verifiablePresentation.proof) {
    verifyOptions = {
      ...verifyOptions,
      presentation: verifiablePresentation,
      domain: options.domain,
      challenge: options.challenge,
    };
  } else {
    verifyOptions = {
      ...verifyOptions,
      unsignedPresentation: verifiablePresentation,
    };
  }

  const result = await vc.verify(verifyOptions);

  if (result.verified) {
    return {
      checks: ['proof'],
      warnings: [],
      errors: [],
    };
  }
  return {
    checks: ['proof'],
    warnings: [],
    errors: ['proof'],
  };
};
