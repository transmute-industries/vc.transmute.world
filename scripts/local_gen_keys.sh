#!/bin/bash

# should be run from the root project folder, but could be run anywhere
mkdir -p ./local/keys > /dev/null 2>&1 

# k0 - Ed25519VerificationKey2018 - did:key, did:key controller
vc-util -t ed25519 > ./local/keys/k0.json

# k1 - Ed25519VerificationKey2018 - did:web, did:web controller
vc-util -t ed25519 -p web > ./local/keys/k1.json

# do not replace elem or veres 1 keys unless you are going to issue of the network
# k2 - Ed25519VerificationKey2018 - did:elem
#vc-util -t ed25519 -dt elem > ./local/keys/k2.json
# k3 - Ed25519VerificationKey2018 - did:v1
#vc-util -t ed25519 -dt v1 > ./local/keys/k3.json

# k4 - Bls12381G1Key2020 - did:key
vc-util -t bls12381 > ./local/keys/k4.json

# k5 - Bls12381G2Key2020 - did:key
vc-util -t bls12381 > ./local/keys/k5.json
