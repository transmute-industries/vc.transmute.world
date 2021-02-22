"use strict";
exports.__esModule = true;
exports.filterVerifiableCredentialsByDidMethods = exports.cloneObj = void 0;
exports.cloneObj = function (obj) {
    return JSON.parse(JSON.stringify(obj));
};
exports.filterVerifiableCredentialsByDidMethods = function (verifiableCredentials, didMethods) {
    return verifiableCredentials.filter(function (item) {
        return didMethods.some(function (didMethod) { return item.issuerDidMethod.startsWith(didMethod); });
    });
};
