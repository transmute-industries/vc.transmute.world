export const cloneObj = (obj: any) => {
  return JSON.parse(JSON.stringify(obj));
};

export const filterVerifiableCredentialsByDidMethods = (
  verifiableCredentials: any[],
  didMethods: any[]
) =>
  verifiableCredentials.filter(item =>
    didMethods.some(didMethod => item.issuerDidMethod.startsWith(didMethod))
  );
