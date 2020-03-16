# Transmute's Verifiable Credentials API

## https://vc.transmute.world/api/docs

WARNING: This is for demo purposes only and is NOT meant for production use as the keys are exposed in the public config.

See the Specifications in the W3C CCG:

- https://github.com/w3c-ccg/vc-issuer-http-api
- https://github.com/w3c-ccg/vc-verifier-http-api

## Issue 

```
curl -s -X POST -H 'Content-type: application/json' -d @./src/__fixtures__/edu/vc.bindingModel.json  https://vc.transmute.world/api/v0/issuer/issue | jq "."
```

See [bindingModel](./src/__fixtures__/edu/vc.bindingModel.json)

## Verify

```
curl -s -X POST -H 'Content-type: application/json' -d @./src/__fixtures__/edu/vc.json  https://vc.transmute.world/api/v0/verifier/verify | jq "."
```

See [vc](./src/__fixtures__/edu/vc.json)

This repo contains Transmute's implementation of:
- https://github.com/w3c-ccg/vc-issuer-http-api
- https://github.com/w3c-ccg/vc-verifier-http-api

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

### Setting A Custom Domain for Google Cloud Run

```
gcloud beta run domain-mappings create --service issuer-verifier-vc-api --domain vc.transmute.industries

gcloud beta run domain-mappings describe --domain vc.transmute.world
```

## Docker

Dockerhub: https://hub.docker.com/r/transmute/issuer-verifier-vc-api

Run latest image:
```
docker pull transmute/issuer-verifier-vc-api:latest
docker run --rm -p 8080:8080 -d transmute/issuer-verifier-vc-api:latest
```

Visit http://localhost:8080

## Issue 

```
curl -s -X POST -H 'Content-type: application/json' -d @./test/vc.bindingModel.json  http://localhost:8080/api/v0/issuer/issue | jq "."
```

See [bindingModel](./test/vc.bindingModel.json)

## Verify

```
curl -s -X POST -H 'Content-type: application/json' -d @./test/vc.json  http://localhost:8080/api/v0/verifier/verify | jq "."
```

See [vc](./test/vc.json)
