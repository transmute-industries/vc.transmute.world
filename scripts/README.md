# Scripts

These scripts enable the user to perform common tasks related to deployment of a reference vc-http-api server

## Context Management

Since contexts should not be queried live they must be periodically updated. `update_contexts.sh` performs this task for key json-ld contexts.

## Local Build Environment

It is useful to have a local environment to build the server container and test things out in a non-destructive manner.
It is also useful to have a reference model for the steps involved in deploying this sample implementaiton of the vc-http-api.

To create a local build environment that allows overriding of key values in the container utilize the init script: `./scripts/local_init.sh` from the root of the repository

Keys may be generated for the local container using: `./scripts/local_gen_keys.sh`.  nb: the cli utility located in `./packages/cli` must be installed for this script to run.

`./scripts/local_bundle.sh` is a quick shortcut to build the container using the local dockerfile: `Dockerfile.local`
