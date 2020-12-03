import fetch from 'node-fetch';
import uuid from 'uuid-random';

function annotateWithUniqueId(credentials: any[]) {
  return credentials.map((credential: any) =>
    credential.id
      ? {
          ...credential,
          id: `${credential.id}#${uuid()}`,
        }
      : credential
  );
}

export const runIssuerTests = (issuerEndpoint: string, credential: any) => {
  beforeAll(() => {
    [credential] = annotateWithUniqueId([credential]);
  });
  describe("1. The Issuer's Issue Credential HTTP API MUST return a 201 HTTP response status code after successful credential issuance.", () => {
    it('positive test', async () => {
      const requestBody = {
        credential,
      };
      const res = await fetch(issuerEndpoint, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/ld+json',
        },
        method: 'post',
        body: JSON.stringify(requestBody),
      });
      const responseBody = await res.json();
      expect(res.status).toBe(201);
      expect(responseBody.proof).toBeDefined();
    });
  });

  describe(`2. The Issuer's Issue Credential HTTP API MUST require "credential" in the body of the POST request. The field "credential" MUST be conformant to [Verifiable Credentials Data Model 1.0](https://www.w3.org/TR/vc-data-model/).`, () => {
    it('positive test', async () => {
      const requestBody = {
        credential,
      };
      const res = await fetch(issuerEndpoint, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/ld+json',
        },
        method: 'post',
        body: JSON.stringify(requestBody),
      });
      const responseBody = await res.json();
      expect(res.status).toBe(201);
      expect(responseBody.proof).toBeDefined();
    });
  });

  // Skipping this test, it should be refactored.
  // describe('3.1 Can issue with all supplied options', () => {
  //   it('test each option for ' + issuer.name, async () => {
  //     await Promise.all(
  //       issuer.options.map(async issuer_options => {
  //         const body = {
  //           credential: credentials[0],
  //           options: {...issuer_options},
  //         };
  //         const res = await help.postJson(issuer.endpoint, body);
  //         expect(res.status).toBe(201);
  //         expect(res.body.proof).toBeDefined();
  //         if(
  //           // eslint-disable-next-line max-len
  //           issuer_vms.indexOf(
  //             res.body.proof.verificationMethod
  //           ) === -1
  //         ) {
  //           issuer_vms.push(res.body.proof.verificationMethod);
  //         }
  //       })
  //     );
  //   });
  // });

  // eslint-disable-next-line max-len
  describe(`4. The Issuer's Issue Credential HTTP API MUST return a 400 HTTP response status code when the request is rejected.`, () => {
    it('positive test', async () => {
      const requestBody = {
        credential: {
          ...credential,
          '@context': 'force_error',
        },
      };
      const res = await fetch(issuerEndpoint, {
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
  describe(`5. The Issuer's Issue Credential HTTP API MUST return a Verifiable Credential with the value of its "issuer" or "issuer.id" as a URI in the body of the response.`, () => {
    it('positive test', async () => {
      const requestBody = {
        credential,
      };
      const res = await fetch(issuerEndpoint, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/ld+json',
        },
        method: 'post',
        body: JSON.stringify(requestBody),
      });
      const responseBody = await res.json();
      expect(res.status).toBe(201);
      expect(responseBody).toBeDefined();
      expect(responseBody.issuer).toBeDefined();
      const issuerId = responseBody.issuer || responseBody.issuer.id;
      expect(issuerId).toBeDefined();
    });
  });

  // eslint-disable-next-line max-len
  describe(`6. The Issuer's Issue Credential HTTP API MUST reject if the value of "options.proofPurpose" in the body of the POST request is not supported.`, () => {
    it('positive test', async () => {
      const requestBody = {
        credential,
        options: {
          proofPurpose: 'foo',
        },
      };
      const res = await fetch(issuerEndpoint, {
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
  describe(`7. The Issuer's Issue Credential HTTP API MUST reject if the value of "options.assertionMethod" in the body of the POST request does not exist.`, () => {
    it('positive test', async () => {
      const requestBody = {
        credential,
        options: {
          assertionMethod: 'foo',
        },
      };
      const res = await fetch(issuerEndpoint, {
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
  describe(`8. The Issuer's Issue Credential HTTP API MUST reject if the value of "credential" in the body of the POST request does not contain a context.`, () => {
    it('positive test', async () => {
      const requestBody = {
        credential,
        options: {
          assertionMethod: 'foo',
        },
      };
      delete requestBody.credential['@context'];
      const res = await fetch(issuerEndpoint, {
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
  describe(`9. The Issuer's Issue Credential HTTP API MUST reject if the value of "credential" in the body of the POST request contains a malformed JSON-LD context.`, () => {
    it('positive test', async () => {
      const requestBody = {
        credential,
      };
      requestBody.credential['@context'] = [
        'https://www.w3.org/2018/credentials/v1',
        'broken',
      ];
      const res = await fetch(issuerEndpoint, {
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
  describe.only(`10. The Issuer's Issue Credential HTTP API MUST must support no "options" in the body of the POST request.`, () => {
    it('positive test', async () => {
      const requestBody = {
        credential,
      };
      const res = await fetch(issuerEndpoint, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/ld+json',
        },
        method: 'post',
        body: JSON.stringify(requestBody),
      });
      const responseBody = await res.json();
      expect(res.status).toBe(201);
      expect(responseBody.proof).toBeDefined();
    });
  });
};
