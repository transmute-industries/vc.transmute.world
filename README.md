# Transmute's Verifiable Credentials API

## https://vc.transmute.world/api/docs

WARNING: This is for demo purposes only and is NOT meant for production use as the keys are exposed in the public config.


curl -s -X POST -H 'Content-type: application/json' -d @./data/vp.json  http://localhost:8080/vc-data-model/verify/presentations | jq "."

See the Specifications in the W3C CCG:

- https://github.com/w3c-ccg/vc-issuer-http-api
- https://github.com/w3c-ccg/vc-verifier-http-api

## Issue 

```
curl -s -X POST -H 'Content-type: application/json' -d @./src/__fixtures__/edu/vc.bindingModel.json  https://vc.transmute.world/vc-data-model/credentials | jq "."
```

See [bindingModel](./src/__fixtures__/edu/vc.bindingModel.json)

## Verify

```
curl -s -X POST -H 'Content-type: application/json' -d @./src/__fixtures__/edu/vc.json  https://vc.transmute.world/vc-data-model/verifications | jq "."
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

We use Github actions for CI/CD. See https://github.com/transmute-industries/vc-http-api/tree/master/.github/workflows
- Run lint and tests
- Deploy to Docker hub
- Deploy to Google cloud run

### Setting A Custom Domain for Google Cloud Run

```
gcloud beta run domain-mappings create --service vc-http-api --domain vc.transmute.industries

gcloud beta run domain-mappings describe --domain vc.transmute.world
```

## Docker

Dockerhub: https://hub.docker.com/r/transmute/vc-http-api

Run latest image:
```
docker pull transmute/vc-http-api:latest
docker run --rm -p 8080:8080 -d transmute/vc-http-api:latest
```

Visit http://localhost:8080

## Issue 

```
curl -s -X POST -H 'Content-type: application/json' -d @./src/__fixtures__/edu/vc.bindingModel.json  http://localhost:8080/vc-data-model/credentials | jq "."
```

See [bindingModel](./test/vc.bindingModel.json)

## Verify

```
curl -s -X POST -H 'Content-type: application/json' -d @./src/__fixtures__/edu/vc.json  http://localhost:8080/vc-data-model/verifications | jq "."
```

See [vc](./test/vc.json)


...

### Github Actions Google Cloud Run CI/CD

- https://github.com/GoogleCloudPlatform/github-actions/blob/master/example-workflows/cloud-run/README.md

RUN_PROJECT=vc-transmute-world