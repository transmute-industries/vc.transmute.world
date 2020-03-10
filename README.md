# Issuer Verifier VC API

## LINK: https://issuer-verifier-vc-api.transmute.world/

This repo contains Transmute's implementation of:
- https://github.com/w3c-ccg/vc-issuer-http-api
- https://github.com/w3c-ccg/vc-verifier-http-api


WARNING: This is for demo purposes only and is NOT meant for production use as the keys are exposed in the public config.

#### Issue 

```
curl -s -X POST -H 'Content-type: application/json' -d @./test/vc.bindingModel.json  http://localhost:4000/api/v1/issuer/issue | jq "."
```

See [bindingModel](./test/vc.bindingModel.json)

#### Verify
```
curl -s -X POST -H 'Content-type: application/json' -d @./test/vc.json  http://localhost:4000/api/v1/verifier/verify | jq "."
```

See [vc](./test/vc.json)


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
docker pull transmute/issuer-verifier-vc-api:latest
docker run --rm -p 8085:8085 -d transmute/issuer-verifier-vc-api:latest
```

Visit http://localhost:8085

or run
```
curl -X POST localhost:8085/issuer/credential | jq "."
```
