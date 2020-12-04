# Verifiable Credentials API

## https://vc.transmute.world/api/docs

WARNING: This is for demo purposes only and is NOT meant for production use as the keys are exposed in the public config.

See the Specifications in the W3C CCG:

- https://github.com/w3c-ccg/vc-http-api

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

### Github Actions Google Cloud Run CI/CD

- https://github.com/GoogleCloudPlatform/github-actions/blob/master/example-workflows/cloud-run/README.md

gcloud beta run services list
gcloud beta run domain-mappings create --service vc-http-api --domain vc.transmute.world --force-override
gcloud beta run domain-mappings describe --domain vc.transmute.world

You will need to add "allUsers" "Cloud Run Invoker" per the instuctions in Google Cloud...

To Enable Public Access.

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
