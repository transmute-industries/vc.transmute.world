#!/bin/bash
# this script will create a local folder structure that will be ignored by git and allow 
# overwriting for deployment and bundling purposes
# note - anything in local/keys should be assumed to be public available
# DO NOT put actual secret keys in this folder before building a container

echo "Initiializing local folder structure"
# for any local specific scripts - will copy to /usr/local/bin
mkdir -p ./local/scripts > /dev/null 2>&1 
# key generation and interim for copying or generating keys into for bundle into the container
mkdir -p ./local/keys > /dev/null 2>&1 
# for contexts
mkdir -p ./local/contexts > /dev/null 2>&1  
# for well known overwrites
mkdir -p ./local/wellknown > /dev/null 2>&1  
# staging build folder in case any items need to be bundled together and built separately before being copied to the container via fs
mkdir -p ./local/build > /dev/null 2>&1 
# to allow for overwriting and additions to the base container fs
mkdir -p ./local/fs > /dev/null 2>&1  

echo "Copying over sane starting point"
# copy over sane starting places from the repo without clobbering
cp -vn ./packages/vc-http-api/src/keys/*.json ./local/keys/
cp -vn ./packages/vc-http-api/src/contexts/*.json ./local/contexts/
cp -vn ./packages/vc-http-api/src/data/didDocument.json ./local/wellknown/
cp -vn ./packages/vc-http-api/src/data/did-configuration.json ./local/wellknown/
cp -vr ./packages/vc-http-api/src/config ./local/