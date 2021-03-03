#!/usr/bin/env node

//src/index.ts - main cli entry point
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
        choices: ["key", "k"]
      },
      keytype: {
        type: "string",
        demandOption: true,
        alias: "t",
        describe: "Desired key type",
        default: "ed25519",
        choices: ["ed25519", "x25519", "bls12381", "p-256", "secp256k1"]
      },
      debug: {
        type: "boolean",
        demandOption: false,
        alias: "d",
        describe: "Turn on some additional debugging output"
      }
    }).argv;

    if (args["debug"]) {
      console.log("Got argumentss:\n", args, "\n\n");
    }

    process.exitCode = 0;
    switch (args["method"]) {
      case "k":
      case "key": {
        await genKeys(args["keytype"] as string);
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
