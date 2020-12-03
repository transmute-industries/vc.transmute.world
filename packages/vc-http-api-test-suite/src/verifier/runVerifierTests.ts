import fetch from 'node-fetch';

function cloneObj(obj: any) {
  return JSON.parse(JSON.stringify(obj));
}

export const runVerifierTests = (vendorOptions: any) => {
  let {
    verifyCredentialEndpoint,
    verifiableCredential,
    validRequestBody,
  } = vendorOptions;

  describe(`1. The Verifier's Verify Credential HTTP API MUST fail to verify a Verifiable Credential with a mutated signature value (ex. a mutated jws) in the proof.`, () => {
    it('should pass with no mutation', async () => {
      const res = await fetch(verifyCredentialEndpoint, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/ld+json',
        },
        method: 'post',
        body: JSON.stringify(validRequestBody),
      });
      const responseBody = await res.json();
      expect(res.status).toBe(200);
      expect(responseBody).toEqual({
        checks: ['proof'],
        warnings: [],
        errors: [],
      });
    });
    it('should fail with with mutation', async () => {
      const requestBody: any = cloneObj(validRequestBody);
      requestBody.verifiableCredential.proof.jws += 'bar';
      const res = await fetch(verifyCredentialEndpoint, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/ld+json',
        },
        method: 'post',
        body: JSON.stringify(requestBody),
      });

      const responseBody = await res.json();
      expect(res.status).toBe(400);
      expect(responseBody).toEqual({
        checks: ['proof'],
        warnings: [],
        errors: ['proof'],
      });
    });
  });

  // eslint-disable-next-line max-len
  describe(`2. The Verifier's Verify Credential HTTP API MUST fail to verify a Verifiable Credential with the "created" property removed from the proof.`, () => {
    it('should fail with without created in proof', async () => {
      const requestBody: any = cloneObj(validRequestBody);
      delete requestBody.verifiableCredential.proof.created;
      const res = await fetch(verifyCredentialEndpoint, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/ld+json',
        },
        method: 'post',
        body: JSON.stringify(requestBody),
      });
      expect(res.status).toBe(400);
    });
  });

  // eslint-disable-next-line max-len
  describe(`3. The Verifier's Verify Credential HTTP API MUST fail to verify a Verifiable Credential with a mutated "proofPurpose" in the proof.`, () => {
    it('should fail ', async () => {
      const requestBody: any = cloneObj(validRequestBody);
      requestBody.verifiableCredential.proof.proofPurpose = 'bar';
      const res = await fetch(verifyCredentialEndpoint, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/ld+json',
        },
        method: 'post',
        body: JSON.stringify(requestBody),
      });
      expect(res.status).toBe(400);
    });
  });

  // eslint-disable-next-line max-len
  describe("4. The Verifier's Verify Credential HTTP API MUST fail to verify a Verifiable Credential with an added property to the credential.", () => {
    it('should fail', async () => {
      const requestBody: any = cloneObj(validRequestBody);
      requestBody.verifiableCredential.newProp = 'foo';
      const res = await fetch(verifyCredentialEndpoint, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/ld+json',
        },
        method: 'post',
        body: JSON.stringify(requestBody),
      });
      expect(res.status).toBe(400);
    });
  });

  // eslint-disable-next-line max-len
  describe("5. The Verifier's Verify Credential HTTP API MUST fail to verify a Verifiable Credential with a removed property from the credential.", () => {
    it('should fail', async () => {
      const requestBody: any = cloneObj(validRequestBody);
      delete requestBody.verifiableCredential.issuer;
      const res = await fetch(verifyCredentialEndpoint, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/ld+json',
        },
        method: 'post',
        body: JSON.stringify(requestBody),
      });
      expect(res.status).toBe(400);
    });
  });

  // eslint-disable-next-line max-len
  describe("6. The Verifier's Verify Credential HTTP API MUST fail to verify a Verifiable Credential with a mutated property to the credential.", () => {
    it('should fail ', async () => {
      const requestBody: any = cloneObj(validRequestBody);
      requestBody.verifiableCredential.issuer = 'bar';
      const res = await fetch(verifyCredentialEndpoint, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/ld+json',
        },
        method: 'post',
        body: JSON.stringify(requestBody),
      });
      expect(res.status).toBe(400);
    });
  });

  // eslint-disable-next-line max-len
  describe("7. The Verifier's Verify Credential HTTP API MUST fail to verify a Verifiable Credential with an added property to the proof.", () => {
    it('should fail ', async () => {
      const requestBody: any = cloneObj(validRequestBody);
      requestBody.verifiableCredential.proof.newProp = 'bar';
      const res = await fetch(verifyCredentialEndpoint, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/ld+json',
        },
        method: 'post',
        body: JSON.stringify(requestBody),
      });
      expect(res.status).toBe(400);
    });
  });

  // eslint-disable-next-line max-len
  describe("8. The Verifier's Verify Credential HTTP API MUST fail to verify a Verifiable Credential a removed property to the proof.", () => {
    it('should fail ', async () => {
      const requestBody: any = cloneObj(validRequestBody);
      delete requestBody.verifiableCredential.proof.proofPurpose;
      const res = await fetch(verifyCredentialEndpoint, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/ld+json',
        },
        method: 'post',
        body: JSON.stringify(requestBody),
      });
      expect(res.status).toBe(400);
    });
  });

  // eslint-disable-next-line max-len
  describe("9. The Verifier's Verify Credential HTTP API MUST fail to verify a Verifiable Credential with a mutated property to the proof.", () => {
    it('should fail ', async () => {
      const requestBody: any = cloneObj(validRequestBody);
      requestBody.verifiableCredential.proof.created += 'bar';
      const res = await fetch(verifyCredentialEndpoint, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/ld+json',
        },
        method: 'post',
        body: JSON.stringify(requestBody),
      });
      expect(res.status).toBe(400);
    });
  });

  // skipping unnecessary complexity
  // // eslint-disable-next-line max-len
  // describe("10. The Verifier's Verify Credential HTTP API MUST verify a Verifiable Credential with at least 2 different DID methods set as the issuer property for a credential.", () => {
  //   it('should pass', async () => {
  //     const endpoint = vendor.verify_credential_endpoint;
  //     const unique_issuers = [];
  //     await Promise.all(
  //       vendor.verifiable_credentials.map(async vc => {
  //         const body = {
  //           verifiableCredential: vc,
  //           options: {
  //             checks: ['proof'],
  //           },
  //         };
  //         const res = await help.postJson(endpoint, body);

  //         expect(res.status).toBe(200);
  //         if (unique_issuers.indexOf(vc.issuer) === -1) {
  //           unique_issuers.push(vc.issuer);
  //         }
  //       })
  //     );
  //     expect(unique_issuers.length).toBeGreaterThanOrEqual(2);
  //   });
  // });

  // eslint-disable-next-line max-len
  describe("11. The Verifier's Verify Credential HTTP API MUST adhere to the proof verification format.", () => {
    it('should pass', async () => {
      const requestBody: any = cloneObj(validRequestBody);
      const res = await fetch(verifyCredentialEndpoint, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/ld+json',
        },
        method: 'post',
        body: JSON.stringify(requestBody),
      });

      const responseBody = await res.json();
      expect(res.status).toBe(200);
      expect(responseBody).toEqual({
        checks: ['proof'],
        warnings: [],
        errors: [],
      });
    });
  });

  // eslint-disable-next-line max-len
  describe("12. The Verifier's Verify Credential HTTP API MUST return a 400 HTTP response status code when the request is rejected.", () => {
    it('should have error', async () => {
      const requestBody = {
        verifiableCredential: null,
        options: {
          checks: ['proof'],
        },
      };
      const res = await fetch(verifyCredentialEndpoint, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/ld+json',
        },
        method: 'post',
        body: JSON.stringify(requestBody),
      });
      expect(res.status).toBe(400);
    });
  });

  // eslint-disable-next-line max-len
  describe("13. The Verifier's Verify Credential HTTP API MUST support the verification of, JSON-LD Proof, Ed25519Signature2018.", () => {
    it('should pass', async () => {
      const proof = Array.isArray(verifiableCredential.proof)
        ? verifiableCredential.proof
        : [verifiableCredential.proof];
      const type = 'Ed25519Signature2018';
      const ed25519Signature2018 = proof.find((p: any) => p.type === type);
      expect(ed25519Signature2018).toBeDefined();

      const res = await fetch(verifyCredentialEndpoint, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/ld+json',
        },
        method: 'post',
        body: JSON.stringify(validRequestBody),
      });
      expect(res.status).toBe(200);
      const responseBody = await res.json();
      expect(responseBody).toEqual({
        checks: ['proof'],
        warnings: [],
        errors: [],
      });
    });
  });
};
