#!/usr/bin/env node

//src/index.ts - main cli entry point
//quiet down a wasm warning from mattr
import { exception } from "console";
import { CliOptions } from "./options/cliOptions";
import { generateKeys } from "./keys/keys";
import { encode as bs58encode } from "bs58";

process.env.NODE_NO_WARNINGS = "1";
process.removeAllListeners("warning");

async function genKeys(
  keyType: string,
  didType: string,
  domain: string,
  multiKey: boolean = false
) {
  try {
    let genKey: any[] = await generateKeys(keyType);
    let results: any[] = [];
    for (let k of genKey) {
      if (k.publicKeyBuffer) {
        let pk = bs58encode(k.publicKeyBuffer);
        delete k.publicKeyBuffer;
        k["publicKeyBase58"] = pk;
      }
      if (k.privateKeyBuffer) {
        let pk = bs58encode(k.privateKeyBuffer);
        delete k.privateKeyBuffer;
        k["privateKeyBase58"] = pk;
      }
      if (k.id) {
        let prefix = "did:" + didType + ":";
        if (didType === "web") {
          k.id = prefix + domain + k.id;
          k.controller = prefix + domain;
        } else if (didType === "key") {
          k.id = k.controller + k.id;
        }
      }
      results.push(k);
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
    const args = CliOptions.argv;

    if (args["debug"]) {
      console.log("Got arguments:\n", args, "\n\n");
    }

    process.exitCode = 0;
    switch (args["method"]) {
      case "k":
      case "key": {
        await genKeys(
          args["keyType"] as string,
          args["didType"] as string,
          args["domain"] as string
        );
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
