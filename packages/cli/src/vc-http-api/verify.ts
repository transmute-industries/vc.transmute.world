import { documentLoader } from "../util/documentLoader";
import { ld as vc } from "@transmute/vc.js";
import { Ed25519Signature2018 } from "@transmute/ed25519-signature-2018";
import {
  BbsBlsSignature2020,
  BbsBlsSignatureProof2020
} from "@mattrglobal/jsonld-signatures-bbs";

const suiteMap = {
  Ed25519Signature2018,
  BbsBlsSignature2020,
  BbsBlsSignatureProof2020
};

export const verifyPresentation = async (
  verifiablePresentation: any,
  options: any
) => {
  let verifyOptions: any = {
    suiteMap,
    documentLoader
  };

  if (verifiablePresentation.proof) {
    verifyOptions = {
      ...verifyOptions,
      presentation: verifiablePresentation,
      domain: options.domain,
      challenge: options.challenge
    };
  } else {
    verifyOptions = {
      ...verifyOptions,
      unsignedPresentation: verifiablePresentation
    };
  }

  const result = await vc.verify(verifyOptions);

  if (result.verified) {
    return {
      checks: ["proof"],
      warnings: [],
      errors: []
    };
  }
  return {
    checks: ["proof"],
    warnings: [],
    errors: ["proof"]
  };
};

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
      documentLoader
    });

    if (result.verified) {
      return {
        checks: ["proof"],
        warnings: [],
        errors: []
      };
    }
    // eslint-disable-next-line no-console
    console.warn(result);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.warn(e);
    // no op
  }

  return {
    checks: ["proof"],
    warnings: [],
    errors: ["proof"]
  };
};
