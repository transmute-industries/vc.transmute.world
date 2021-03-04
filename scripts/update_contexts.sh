#!/bin/bash

echo "Fetching latests contexts..."
VCCONTEXTS="./packages/vc-http-api/src/contexts/" 
CLICONTEXTS="./packages/cli/src/contexts/"

# did-configuration-v0.2.json
# did-v0.11.json

# cmtr-v0.2.json

# bbs-v1.json
# citizenship-v1.json
# vaccination-v1.json

# sidetree-v0.1.json
# v1.json

# sec-v3.json
# https://raw.githubusercontent.com/w3c-ccg/security-vocab/master/contexts/security-v3-unstable.jsonld
echo "Fetching sec-v3"
secContext="${VCCONTEXTS}sec-v3.json"
curl "https://raw.githubusercontent.com/w3c-ccg/security-vocab/master/contexts/security-v3-unstable.jsonld" -o $secContext

# traceability-v1.json
# https://w3c-ccg.github.io/traceability-vocab/contexts/traceability-v1.jsonld
echo "Fetching traceability-v1"
traceContext="${VCCONTEXTS}traceability-v1.json"
curl "https://w3c-ccg.github.io/traceability-vocab/contexts/traceability-v1.jsonld" -o $traceContext

echo "Copying Contexts..."
cp -rv $VCCONTEXTS* $CLICONTEXTS
