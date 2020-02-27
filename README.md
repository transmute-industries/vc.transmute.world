# Issuer Verifier VC API

# LINK: https://issuer-verifier-vc-api.transmute.world/

This repo contains Transmute's implementation of:
- https://github.com/w3c-ccg/vc-issuer-http-api
- https://github.com/w3c-ccg/vc-verifier-http-api


WARNING: This is for demo purposes only and is NOT meant for production use as the keys are exposed in the public config.

## Examples

Getting a credential:

```
➜ curl -X POST -H 'Content-type: application/json' --data '{ "types": ["UniversityDegreeCredential"], "subject": "did:example:me", "claims": { "alumniOf": { "id": "did:example:university", "name": "Example University" } } }' https://issuer-verifier-vc-api.transmute.world/issuer/credential | jq "."

{
  "@context": [
    "https://www.w3.org/2018/credentials/v1",
    "https://www.w3.org/2018/credentials/examples/v1"
  ],
  "id": "http://example.com/credentials/ac32eb19-858d-47d2-83d5-f4f070deff6e",
  "type": [
    "VerifiableCredential",
    "UniversityDegreeCredential"
  ],
  "issuer": "https://example.com/transmute",
  "issuanceDate": "2020-02-27T07:54:38.750Z",
  "credentialSubject": {
    "id": "did:example:me",
    "alumniOf": {
      "id": "did:example:university",
      "name": "Example University"
    }
  },
  "proof": {
    "type": "Ed25519Signature2018",
    "created": "2020-02-27T07:54:38Z",
    "jws": "eyJhbGciOiJFZERTQSIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..cwVp_MHPJb-edHCDuLlwFjlfw-V0Ipd4fsvf_FxNdNvpFQdLJ0lN1NHTdV5ypXQEpey8srDLtdjBV2BwN3isDg",
    "proofPurpose": "assertionMethod",
    "verificationMethod": "https://example.com/transmute/keys/1"
  }
}
```

Verifying a credential:

```
➜ curl -X POST -H 'Content-type: application/json' --data '{ "@context": [ "https://www.w3.org/2018/credentials/v1", "https://www.w3.org/2018/credentials/examples/v1" ], "id": "http://example.com/credentials/ac32eb19-858d-47d2-83d5-f4f070deff6e", "type": [ "VerifiableCredential", "UniversityDegreeCredential" ], "issuer": "https://example.com/transmute", "issuanceDate": "2020-02-27T07:54:38.750Z", "credentialSubject": { "id": "did:example:me", "alumniOf": { "id": "did:example:university", "name": "Example University" } }, "proof": { "type": "Ed25519Signature2018", "created": "2020-02-27T07:54:38Z", "jws": "eyJhbGciOiJFZERTQSIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..cwVp_MHPJb-edHCDuLlwFjlfw-V0Ipd4fsvf_FxNdNvpFQdLJ0lN1NHTdV5ypXQEpey8srDLtdjBV2BwN3isDg", "proofPurpose": "assertionMethod", "verificationMethod": "https://example.com/transmute/keys/1" } }' https://issuer-verifier-vc-api.transmute.world/verifier/verifications | jq "."

{
  "verified": true,
  "results": [
    {
      "proof": {
        "@context": "https://w3id.org/security/v2",
        "type": "Ed25519Signature2018",
        "created": "2020-02-27T07:54:38Z",
        "jws": "eyJhbGciOiJFZERTQSIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..cwVp_MHPJb-edHCDuLlwFjlfw-V0Ipd4fsvf_FxNdNvpFQdLJ0lN1NHTdV5ypXQEpey8srDLtdjBV2BwN3isDg",
        "proofPurpose": "assertionMethod",
        "verificationMethod": "https://example.com/transmute/keys/1"
      },
      "verified": true,
      "purposeResult": {
        "valid": true
      }
    }
  ]
}
```



## Getting started

```
npm install
npm run lint
npm test
npm start
```

## CI/CD

We use Github actions for CI/CD. See https://github.com/transmute-industries/issuer-verifier-vc-api/tree/master/.github/workflows
- Run lint and tests
- Deploy to Docker hub
- Deploy to Google cloud run

## Docker

Dockerhub: https://hub.docker.com/r/transmute/issuer-verifier-vc-api

Run latest image:
```
docker run --rm -p 8080:8080 -d transmute/issuer-verifier-vc-api:latest
```

```
curl -X POST localhost:8080/issuer/credential | jq "."
```
