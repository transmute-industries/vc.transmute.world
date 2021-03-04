import crypto from "crypto";
import * as ed25519 from "@transmute/did-key-ed25519";
import * as x25519 from "@transmute/did-key-x25519";
import * as secp256k1 from "@transmute/did-key-secp256k1";
import * as bls12381 from "@transmute/did-key-bls12381";
import * as didKeyWeb from "@transmute/did-key-web-crypto";

export const generateKeys = async (type: any): Promise<any[]> => {
  const options = {
    secureRandom: () => {
      return crypto.randomBytes(32);
    }
  };
  let r: any;
  switch (type) {
    case "ed25519": {
      r = [await ed25519.Ed25519KeyPair.generate(options)];
      break;
    }
    case "x25519": {
      r = [await x25519.X25519KeyPair.generate(options)];
      break;
    }
    case "bls12381": {
      const keypairs = await bls12381.Bls12381KeyPairs.generate();
      r = [keypairs.g1KeyPair, keypairs.g2KeyPair];
      break;
    }
    case "p-256": {
      r = [
        await didKeyWeb.KeyPair.generate({
          kty: "EC",
          crvOrSize: "P-256"
        })
      ];
      break;
    }
    case "secp256k1": {
      r = [await secp256k1.Secp256k1KeyPair.generate(options)];
      break;
    }
    default:
      throw new Error("Unsupported key type " + type);
  }
  return r;
};
