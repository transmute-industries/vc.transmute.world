#!/bin/bash
# this script serves to bundle locally generated keys into a dockerfile cleanly, 
# allowing for any other replacements that you want to make
#
# key folder structures to be aware of:
# ./local/keys -> packages/vc-http-api/src/contexts/keys - will overwrite keys kefore npm builds stuff in the container
# ./local/fs -> / - will call last and add any other items to the root of the container permitting selective overrite and additions

echo $@
docker build $@ -f ./Dockerfile.local .