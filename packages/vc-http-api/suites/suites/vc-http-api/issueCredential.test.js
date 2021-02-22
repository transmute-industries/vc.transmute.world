"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var defaultSuiteConfig_1 = require("./defaultSuiteConfig");
var httpClient = require("../../services/httpClient");
var suiteConfig = global.suiteConfig || defaultSuiteConfig_1["default"];
if (suiteConfig.issueCredentialConfiguration) {
    describe('Issue Credential API - Conformance', function () {
        // Load in the static test fixtures
        var credentials = suiteConfig.credentials;
        // Deal with possible polymorphic issuer configuration
        var issuerConfiguration = Array.isArray(suiteConfig.issueCredentialConfiguration)
            ? suiteConfig.issueCredentialConfiguration
            : [suiteConfig.issueCredentialConfiguration];
        issuerConfiguration.forEach(function (value) {
            describe("with issuer: " + value.id, function () {
                it("1. The Issuer's Issue Credential HTTP API MUST return a 201 HTTP response status code after successful credential issuance.", function () { return __awaiter(void 0, void 0, void 0, function () {
                    var body, res;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                body = {
                                    credential: __assign(__assign({}, credentials[0].data), { issuer: value.id })
                                };
                                return [4 /*yield*/, httpClient.postJson(value.endpoint, body, {})];
                            case 1:
                                res = _a.sent();
                                expect(res.status).toBe(201);
                                expect(res.body.proof).toBeDefined();
                                return [2 /*return*/];
                        }
                    });
                }); });
                it("2. The Issuer's Issue Credential HTTP API MUST require \"credential\" in the body of the POST request. The field \"credential\" MUST be conformant to [Verifiable Credentials Data Model 1.0](https://www.w3.org/TR/vc-data-model/).", function () { return __awaiter(void 0, void 0, void 0, function () {
                    var body, res;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                body = {
                                    credential: __assign(__assign({}, credentials[0].data), { issuer: value.id })
                                };
                                return [4 /*yield*/, httpClient.postJson(value.endpoint, body, {})];
                            case 1:
                                res = _a.sent();
                                expect(res.status).toBe(201);
                                expect(res.body.proof).toBeDefined();
                                return [2 /*return*/];
                        }
                    });
                }); });
                it("3. The Issuer's Issue Credential HTTP API MUST return a 400 HTTP response status code when the request is rejected.", function () { return __awaiter(void 0, void 0, void 0, function () {
                    var body, res;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                body = {
                                    credential: __assign(__assign({}, credentials[0]), { '@context': 'force_error' })
                                };
                                return [4 /*yield*/, httpClient.postJson(value.endpoint, body, {})];
                            case 1:
                                res = _a.sent();
                                expect(res.status).toBe(400);
                                return [2 /*return*/];
                        }
                    });
                }); });
                it("4. The Issuer's Issue Credential HTTP API MUST return a Verifiable Credential with the value of its \"issuer\" or \"issuer.id\" as a URI in the body of the response.", function () { return __awaiter(void 0, void 0, void 0, function () {
                    var body, res, issuerId;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                body = {
                                    credential: __assign(__assign({}, credentials[0].data), { issuer: value.id })
                                };
                                return [4 /*yield*/, httpClient.postJson(value.endpoint, body, {})];
                            case 1:
                                res = _a.sent();
                                expect(res.status).toBe(201);
                                expect(res.body).toBeDefined();
                                expect(res.body.issuer).toBeDefined();
                                issuerId = res.body.issuer || res.body.issuer.id;
                                expect(issuerId).toBeDefined();
                                return [2 /*return*/];
                        }
                    });
                }); });
                it("5. The Issuer's Issue Credential HTTP API MUST reject if the value of \"options.proofPurpose\" in the body of the POST request is not supported.", function () { return __awaiter(void 0, void 0, void 0, function () {
                    var body, res;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                body = {
                                    credential: __assign(__assign({}, credentials[0].data), { issuer: value.id }),
                                    options: {
                                        proofPurpose: 'foo'
                                    }
                                };
                                return [4 /*yield*/, httpClient.postJson(value.endpoint, body, {})];
                            case 1:
                                res = _a.sent();
                                expect(res.status).toBe(400);
                                return [2 /*return*/];
                        }
                    });
                }); });
                it("6. The Issuer's Issue Credential HTTP API MUST reject if the value of \"options.assertionMethod\" in the body of the POST request does not exist.", function () { return __awaiter(void 0, void 0, void 0, function () {
                    var body, res;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                body = {
                                    credential: __assign(__assign({}, credentials[0].data), { issuer: value.id }),
                                    options: __assign(__assign({}, value.options[0]), { assertionMethod: 'foo' })
                                };
                                return [4 /*yield*/, httpClient.postJson(value.endpoint, body, {})];
                            case 1:
                                res = _a.sent();
                                expect(res.status).toBe(400);
                                return [2 /*return*/];
                        }
                    });
                }); });
                it("7. The Issuer's Issue Credential HTTP API MUST reject if the value of \"credential\" in the body of the POST request does not contain a context.", function () { return __awaiter(void 0, void 0, void 0, function () {
                    var body, res;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                body = {
                                    credential: __assign(__assign({}, credentials[0].data), { issuer: value.id })
                                };
                                delete body.credential['@context'];
                                return [4 /*yield*/, httpClient.postJson(value.endpoint, body, {})];
                            case 1:
                                res = _a.sent();
                                expect(res.status).toBe(400);
                                return [2 /*return*/];
                        }
                    });
                }); });
                it("8. The Issuer's Issue Credential HTTP API MUST reject if the value of \"credential\" in the body of the POST request contains a malformed JSON-LD context.", function () { return __awaiter(void 0, void 0, void 0, function () {
                    var body, res;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                body = {
                                    credential: __assign(__assign({}, credentials[0].data), { issuer: value.id })
                                };
                                body.credential['@context'] = [
                                    'https://www.w3.org/2018/credentials/v1',
                                    'broken',
                                ];
                                return [4 /*yield*/, httpClient.postJson(value.endpoint, body, {})];
                            case 1:
                                res = _a.sent();
                                expect(res.status).toBe(400);
                                return [2 /*return*/];
                        }
                    });
                }); });
                it("9. The Issuer's Issue Credential HTTP API MUST must support no \"options\" in the body of the POST request.", function () { return __awaiter(void 0, void 0, void 0, function () {
                    var body, res;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                body = {
                                    credential: __assign(__assign({}, credentials[0].data), { issuer: value.id })
                                };
                                return [4 /*yield*/, httpClient.postJson(value.endpoint, body, {})];
                            case 1:
                                res = _a.sent();
                                expect(res.status).toBe(201);
                                expect(res.body.proof).toBeDefined();
                                return [2 /*return*/];
                        }
                    });
                }); });
            });
        });
    });
    describe('Issue Credential API - Credential Type Interop', function () {
        // Load in the static test fixtures
        var credentials = suiteConfig.credentials;
        // Deal with possible polymorphic issuer configuration
        var issuerConfiguration = Array.isArray(suiteConfig.issueCredentialConfiguration)
            ? suiteConfig.issueCredentialConfiguration
            : [suiteConfig.issueCredentialConfiguration];
        issuerConfiguration.forEach(function (value) {
            describe("With issuer: " + value.id, function () {
                credentials.forEach(function (credential) {
                    it("Can issue " + credential.name + " credential", function () { return __awaiter(void 0, void 0, void 0, function () {
                        var body, res;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    body = {
                                        credential: __assign(__assign({}, credentials[0].data), { issuer: value.id })
                                    };
                                    return [4 /*yield*/, httpClient.postJson(value.endpoint, body, {})];
                                case 1:
                                    res = _a.sent();
                                    expect(res.status).toBe(201);
                                    expect(res.body.proof).toBeDefined();
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                });
            });
        });
    });
}
