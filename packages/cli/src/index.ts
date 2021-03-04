#!/usr/bin/env node

//src/index.ts - main cli entry point
//quiet down a wasm warning from mattr
process.env.NODE_NO_WARNINGS = "1";
process.removeAllListeners('warning');

import { exception } from "console";
import yargs from "yargs"; //unfortunately have to require or default import
import { generateKeys } from "./keys/keys";

async function genKeys(keyType: string, multiKey: boolean = false) {
  try {
    let genKey: any[] = await generateKeys(keyType);
    let results: any[] = [];
    for (let k of genKey) {
      if (k.publicKeyBuffer) {
        let pk = k.publicKeyBuffer.toString('hex')
        delete k.publicKeyBuffer;
        k['publicKeyBase58'] = pk;
      }
      if (k.privateKeyBuffer) {
        let pk = k.privateKeyBuffer.toString('hex')
        delete k.privateKeyBuffer;
        k['privateKeyBase58'] = pk;
      }
      if (k.id) {
        if (k.id.startsWith('#')) {
          k.id = k.controller + k.id;
        }
      }
      results.push(k)
    }
    let r: any;
    if (multiKey) {
      r = results;
    } else {
      r = results[0];
    }
    console.log(JSON.stringify(r, null, 4));
  } catch (keyError) {
    process.exitCode = -1;
    console.log("Error generating key:", keyError);
  }
}
async function issueCred() {
  process.exitCode = -3;
  throw exception("Not yet implemented");
}
async function verifyCred() {
  process.exitCode = -3;
  throw exception("Not yet implemented");
}
async function present() {
  process.exitCode = -3;
  throw exception("Not yet implemented");
}

void (async function main() {
  try {
    const args = yargs.options({
      method: {
        type: "string",
        demandOption: true,
        alias: "m",
        describe:
          "What method would you like to invoke, e.g. generate a key, issue a credential, etc.",
        default: "k",
        choices: ["key", "k", "i", "issue", "v", "verify", "p", "present"]
      },
      keytype: {
        type: "string",
        demandOption: true,
        alias: "t",
        describe: "Desired key type",
        default: "ed25519",
        choices: ["ed25519", "x25519", "bls12381", "p-256", "secp256k1"]
      },
      input: {
        type: "string",
        demandOption: true,
        alias: "i",
        describe:
          "Specify an input file to issue a credential on, etc.  In most cases this will be in json-ld or json format",
        default: "./test.json"
      },
      output: {
        type: "string",
        demandOption: true,
        alias: "o",
        describe: "Specify an output file to write to.",
        default: "./test.json"
      },
      inkey: {
        type: "string",
        demandOption: true,
        alias: "ik",
        describe:
          "Specify an file to use as the key for operations that require it",
        default: "./test.json"
      },
      multiKey: {
        type: "boolean",
        demandOption: false,
        alias: "mk",
        describe: "enable multi key returns"
      },
      debug: {
        type: "boolean",
        demandOption: false,
        alias: "d",
        describe: "Turn on some additional debugging output"
      }
    }).argv;

    if (args["debug"]) {
      console.log("Got arguments:\n", args, "\n\n");
    }

    process.exitCode = 0;
    switch (args["method"]) {
      case "k":
      case "key": {
        await genKeys(args["keytype"] as string);
        break;
      }
      case "i":
      case "issue": {
        await issueCred();
        break;
      }
      case "v":
      case "verify": {
        await verifyCred();
        break;
      }
      case "p":
      case "present": {
        await present();
        break;
      }
      default: {
        console.log("Unsupported method selected");
        process.exitCode = -2;
        break;
      }
    }
  } catch (cliError) {
    process.exitCode = -1;
    console.log("Error with selected method:", cliError);
  }
})();
