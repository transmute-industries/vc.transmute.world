const cloneObj = (obj: any) => {
  return JSON.parse(JSON.stringify(obj));
};

const checkVerifiableCredentialLinkedDataProofType = (
  element: any,
  supportedProofTypes: any
) =>
  supportedProofTypes.some((proofType: any) => element.proofType === proofType);

const checkVerifiableCredentialIssuerDidMethod = (
  element: any,
  supportedDidMethods: any
) =>
  supportedDidMethods.some((didMethod: string) =>
    element.issuerDidMethod.startsWith(didMethod)
  );

const checkVerifiableCredentialCredentialStatus = (
  element: any,
  supportCredentialStatuses: any
) =>
  supportCredentialStatuses.some(
    (credentialStatus: any) =>
      element.credentialStatusTypes &&
      element.credentialStatusTypes.includes(credentialStatus)
  );

const filterVerifiableCredentialsByLinkedDataProofType = (
  verifiableCredentials: any,
  proofType: any
) =>
  verifiableCredentials.filter((item: any) =>
    checkVerifiableCredentialLinkedDataProofType(item, proofType)
  );

const filterVerifiableCredentialsByDidMethods = (
  verifiableCredentials: any,
  didMethods: any
) =>
  verifiableCredentials.filter((item: any) =>
    checkVerifiableCredentialIssuerDidMethod(item, didMethods)
  );

const filterVerifiableCredentialsWithCredentialStatus = (
  verifiableCredentials: any
) => verifiableCredentials.filter((item: any) => item.credentialStatusTypes);

const filterVerifiableCredentialsForVendorConfig = (
  verifiableCredentials: any,
  config: any
) =>
  verifiableCredentials.filter(
    (item: any) =>
      checkVerifiableCredentialIssuerDidMethod(
        item,
        config.didMethodsSupported
      ) &&
      checkVerifiableCredentialLinkedDataProofType(
        item,
        config.linkedDataProofSuitesSupported
      ) &&
      (!item.credentialStatusTypes ||
        !config.credentialStatusesSupported ||
        checkVerifiableCredentialCredentialStatus(
          item,
          config.credentialStatusesSupported
        ))
  );

export {
  cloneObj,
  filterVerifiableCredentialsByLinkedDataProofType,
  filterVerifiableCredentialsByDidMethods,
  filterVerifiableCredentialsWithCredentialStatus,
  filterVerifiableCredentialsForVendorConfig,
};
