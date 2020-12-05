let fetch = require("node-fetch");

let { suiteConfig } = global;

if (!suiteConfig) {
  suiteConfig = require("./defaultSuiteConfig.json");
}

describe("issuer-api", () => {
  it("suite config should have correct name", async () => {
    expect(suiteConfig.name).toBe("issuer-api");
  });

  it("endpoint must contain /issue/credentials", async () => {
    expect(suiteConfig.endpoint.indexOf("/issue/credentials") !== -1).toBe(
      true
    );
  });

  it("verificationMethods must be greater than 1", async () => {
    expect(suiteConfig.verificationMethods.length).toBeGreaterThan(1);
  });

  it("credentials must be at least 1", async () => {
    expect(suiteConfig.credentials.length).toBeGreaterThan(0);
  });

  it("can issue all credentials from all verificationMethods", async () => {
    await Promise.all(
      suiteConfig.verificationMethods.map((vm) => {
        return Promise.all(
          suiteConfig.credentials.map(async (c) => {
            const res = await fetch(suiteConfig.endpoint, {
              headers: {
                "Content-Type": "application/json",
                Accept: "application/ld+json",
              },
              method: "post",
              body: JSON.stringify({
                credential: {
                  ...c,
                  issuer: vm.split("#")[0],
                  credentialSubject: {
                    ...c.credentialsSubject,
                    id: vm.split("#")[0],
                  },
                },
                options: {
                  proofPurpose: "assertionMethod",
                  verificationMethod: vm,
                },
              }),
            });
            const responseBody = await res.json();
            expect(res.status).toBe(201);
            expect(responseBody.proof).toBeDefined();
            return;
          })
        );
      })
    );
    // expect(.length).toBeGreaterThan(1);
    // const requestBody = {
    //   credential,
    // };
  });
});
