import { ld as vc } from "@transmute/vc.js";
import { Ed25519Signature2018 } from "@transmute/ed25519-signature-2018";
import { Ed25519KeyPair } from "@transmute/did-key-ed25519";
import { documentLoader } from "../util/documentLoader";

export const signPresentation = async (
  presentation: any,
  key: any,
  options: any
) => {
  // use options to look up key.
  const k: any = key;

  const suite = new Ed25519Signature2018({
    key: await Ed25519KeyPair.from(k)
  });
  const result = await vc.signPresentation({
    presentation,
    suite,
    challenge: options.challenge,
    domain: options.domain,
    documentLoader
  });

  return result;
};
