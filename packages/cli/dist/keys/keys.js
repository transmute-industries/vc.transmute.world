"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateKeys = void 0;
const crypto_1 = __importDefault(require("crypto"));
const ed25519 = __importStar(require("@transmute/did-key-ed25519"));
const x25519 = __importStar(require("@transmute/did-key-x25519"));
const secp256k1 = __importStar(require("@transmute/did-key-secp256k1"));
const bls12381 = __importStar(require("@transmute/did-key-bls12381"));
const didKeyWeb = __importStar(require("@transmute/did-key-web-crypto"));
const generateKeys = async (type) => {
    const options = {
        secureRandom: () => {
            return crypto_1.default.randomBytes(32);
        }
    };
    switch (type) {
        case "ed25519": {
            return [await ed25519.Ed25519KeyPair.generate(options)];
        }
        case "x25519": {
            return [await x25519.X25519KeyPair.generate(options)];
        }
        case "bls12381": {
            const keypairs = await bls12381.Bls12381KeyPairs.generate();
            return [keypairs.g1KeyPair, keypairs.g2KeyPair];
        }
        case "p-256": {
            return [
                await didKeyWeb.KeyPair.generate({
                    kty: "EC",
                    crvOrSize: "P-256"
                })
            ];
        }
        case "secp256k1": {
            return [await secp256k1.Secp256k1KeyPair.generate(options)];
        }
    }
    throw new Error("Unsupported key type " + type);
};
exports.generateKeys = generateKeys;
