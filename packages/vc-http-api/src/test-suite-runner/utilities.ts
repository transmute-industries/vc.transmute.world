export const cloneObj = (obj: any) => {
  return JSON.parse(JSON.stringify(obj));
};

export const filterVerifiableCredentialsByDidMethods = (
  verifiableCredentials: any,
  didMethods: any
) =>
  verifiableCredentials.filter((item: any) =>
    didMethods.some((didMethod: any) =>
      item.issuerDidMethod.startsWith(didMethod)
    )
  );
