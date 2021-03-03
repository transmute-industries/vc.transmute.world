import { ld as vc } from "@transmute/vc.js";
import { documentLoader } from "../util/documentLoader";
import { Ed25519KeyPair } from "@transmute/did-key-ed25519";
import { Ed25519Signature2018 } from "@transmute/ed25519-signature-2018";
import {
    BbsBlsSignatureProof2020,
    BbsBlsSignature2020,
    Bls12381G2KeyPair,
    deriveProof
} from "@mattrglobal/jsonld-signatures-bbs";

export const deriveCredential = async (
    verifiableCredential: any,
    frame: any
) => {
    if (verifiableCredential.proof.type !== "BbsBlsSignature2020") {
        throw new Error("BbsBlsSignature2020 is required for derviveCredential");
    }
    const suite = new BbsBlsSignatureProof2020();
    const result = await deriveProof(verifiableCredential, frame, {
        suite,
        documentLoader
    });

    return result;
};

export const issueCredential = async (credential: any, key: any) => {
    // use options to look up key.
    const k: any = key;

    if (!k) {
        throw new Error("unsupported assertionMethod");
    }
    let suite: any;

    if (k.type === "Bls12381G2Key2020") {
        suite = new BbsBlsSignature2020({
            key: await Bls12381G2KeyPair.from(k)
        });
    }

    if (
        k.type === "Ed25519VerificationKey2018" ||
        (k.publicKeyJwk && k.publicKeyJwk.crv === "Ed25519")
    ) {
        suite = new Ed25519Signature2018({
            key: await Ed25519KeyPair.from(k)
        });
    }

    const verifiableCredential = await vc.issue({
        credential: { ...credential },
        suite,
        documentLoader
    });
    return verifiableCredential;
};
