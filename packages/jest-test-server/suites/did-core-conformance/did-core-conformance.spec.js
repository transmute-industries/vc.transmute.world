let { suiteConfig } = global;

if (!suiteConfig) {
  suiteConfig = require("./defaultSuiteConfig.json");
}

describe("did-core-conformance", () => {
  it("suite config should have correct name", async () => {
    expect(suiteConfig.name).toBe("did-core-conformance");
  });

  describe("resolution", () => {
    suiteConfig.validDids.forEach((validDid) => {
      suiteConfig.validMimeTypes.forEach((contentType) => {
        describe(contentType, () => {
          it("did should match did-document id", async () => {
            expect(suiteConfig[validDid][contentType].didDocument.id).toBe(
              validDid
            );
          });
        });
      });
    });
  });
});
