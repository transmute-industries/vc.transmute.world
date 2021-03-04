import yargs from "yargs"; //unfortunately have to require or default import

export const CliOptions = yargs.options({
  method: {
    type: "string",
    demandOption: true,
    alias: "m",
    describe:
      "What method would you like to invoke, e.g. generate a key, issue a credential, etc.",
    default: "k",
    choices: ["key", "k", "i", "issue", "v", "verify", "p", "present"]
  },
  keyType: {
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
  inKey: {
    type: "string",
    demandOption: true,
    alias: "k",
    describe:
      "Specify an file to use as the key for operations that require it",
    default: "./test.json"
  },
  didType: {
    type: "string",
    demandOption: true,
    alias: "p",
    describe: "Specify a did type",
    default: "key",
    choices: ["key", "web", "elem", "v1"]
  },
  domain: {
    type: "string",
    demandOption: true,
    alias: "d",
    describe: "Specify a domain where required",
    default: "example.org"
  },
  multiKey: {
    type: "boolean",
    demandOption: false,
    describe: "enable multi key returns"
  },
  debug: {
    type: "boolean",
    demandOption: false,
    describe: "Turn on some additional debugging output"
  }
});
