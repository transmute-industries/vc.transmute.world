# Issuer Verifier VC API

This repo contains Transmute's implementation of:
- https://github.com/w3c-ccg/vc-issuer-http-api
- https://github.com/w3c-ccg/vc-verifier-http-api

https://issuer-verifier-vc-api.transmute.world/

WARNING: This is for demo purposes only and is NOT meant for production use as the keys are exposed in the public config.

## Getting started

```
npm install
npm test
```

## CI/CD

We use Github actions for CI/CD:
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
➜ curl -X POST localhost:8080/api/issuer/credential | jq "."
```
