#!/usr/bin/env node

//src/index.ts - main cli entry point
import { exception } from "console";
import yargs from "yargs"; //unfortunately have to require or default import
import { generateKeys } from "./keys/keys";

async function genKeys(keyType: string) {
  try {
    let genKey = await generateKeys(keyType);
    console.log(genKey, "\n");
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
      inkey: {
        type: "string",
        demandOption: true,
        alias: "ik",
        describe:
          "Specify an file to use as the key for operations that require it",
        default: "./test.json"
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
