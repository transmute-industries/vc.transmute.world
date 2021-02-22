"use strict";
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
var utilities = require("../../services/utilities");
var suiteConfig = global.suiteConfig || defaultSuiteConfig_1["default"];
if (suiteConfig.verifyPresentationConfiguration) {
    describe('Verify Presentation API', function () {
        // Load in the static test fixtures
        var verifiablePresentations = suiteConfig.verifiablePresentations;
        var verifierEndpoint = suiteConfig.verifyPresentationConfiguration.endpoint;
        beforeEach(function () {
            verifiablePresentations = utilities.cloneObj(suiteConfig.verifiablePresentations);
        });
        // eslint-disable-next-line max-len
        describe("1. The Verifier's Verify Presentation HTTP API MUST verify a Verifiable Presentation where the credential's issuer, presentation's holder and credential's subject are different.", function () {
            it('should pass', function () { return __awaiter(void 0, void 0, void 0, function () {
                var solutions, testVps;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            solutions = [];
                            testVps = verifiablePresentations.filter(function (vp) {
                                return (vp.holder !== vp.verifiableCredential[0].issuer &&
                                    vp.holder !== vp.verifiableCredential[0].credentialSubject.id &&
                                    vp.verifiableCredential[0].issuer !==
                                        vp.verifiableCredential[0].credentialSubject.id);
                            });
                            return [4 /*yield*/, Promise.all(testVps.map(function (vp) { return __awaiter(void 0, void 0, void 0, function () {
                                    var body, res;
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0:
                                                // this logic needs to account for objet and string variations
                                                expect(vp.holder).not.toBe(vp.verifiableCredential[0].issuer);
                                                expect(vp.holder).not.toBe(vp.verifiableCredential[0].credentialSubject.id);
                                                body = {};
                                                if (vp.proof) {
                                                    body = {
                                                        verifiablePresentation: vp,
                                                        options: {
                                                            challenge: vp.proof.challenge,
                                                            domain: vp.proof.domain,
                                                            checks: ['proof']
                                                        }
                                                    };
                                                }
                                                else {
                                                    body = {
                                                        verifiablePresentation: vp,
                                                        options: {}
                                                    };
                                                }
                                                return [4 /*yield*/, httpClient.postJson(verifierEndpoint, body, {})];
                                            case 1:
                                                res = _a.sent();
                                                expect(res.status).toBe(200);
                                                solutions.push(vp);
                                                return [2 /*return*/];
                                        }
                                    });
                                }); }))];
                        case 1:
                            _a.sent();
                            expect(solutions.length).toBeGreaterThanOrEqual(testVps.length);
                            return [2 /*return*/];
                    }
                });
            }); });
        });
        // // eslint-disable-next-line max-len
        // describe(`2. The Verifier's Verify Presentation HTTP API MUST verify a Verifiable Presentation where the credential's issuer, presentation's holder and credential's subject are the same.`, () => {
        //   it('should pass', async () => {
        //     // this logic needs to account for object and string variations...
        //     const testVps = verifiablePresentations.filter((vp: any) => {
        //       return (
        //         vp.holder === vp.verifiableCredential[0].issuer ||
        //         (vp.verifiableCredential[0].issuer.id &&
        //           vp.holder === vp.verifiableCredential[0].credentialSubject.id)
        //       );
        //     });
        //     const solutions = [];
        //     await Promise.all(
        //       testVps.map(async (vp: any) => {
        //         const body = {
        //           verifiablePresentation: vp,
        //           options: {
        //             challenge: vp.proof.challenge,
        //             domain: vp.proof.domain,
        //             checks: ['proof'],
        //           },
        //         };
        //         const res = await httpClient.postJson(verifierEndpoint, body, {});
        //         expect(res.status).toBe(200);
        //         solutions.push(vp);
        //       })
        //     );
        //     expect(solutions.length).toBeGreaterThanOrEqual(testVps.length);
        //   });
        // });
        // // eslint-disable-next-line max-len
        // describe("3. The Verifier's Verify Presentation HTTP API MUST adhere to the proof verification format.", () => {
        //   it('should pass', async () => {
        //     const body = {
        //       verifiablePresentation: verifiablePresentations[0],
        //       options: {
        //         challenge: verifiablePresentations[0].proof.challenge,
        //         domain: verifiablePresentations[0].proof.domain,
        //         checks: ['proof'],
        //       },
        //     };
        //     const res = await httpClient.postJson(verifierEndpoint, body, {});
        //     expect(res.status).toBe(200);
        //     expect(res.body.checks).toEqual(['proof']);
        //   });
        // });
        // // eslint-disable-next-line max-len
        // describe("4. The Verifier's Verify Presentation HTTP API MUST return a 400 HTTP response status code when the request is rejected.", () => {
        //   it('should have error', async () => {
        //     const body = {
        //       verifiablePresentation: null,
        //       options: {
        //         challenge: verifiablePresentations[0].proof.challenge,
        //         domain: verifiablePresentations[0].proof.domain,
        //         checks: ['proof'],
        //       },
        //     };
        //     const res = await httpClient.postJson(verifierEndpoint, body, {});
        //     expect(res.status).toBe(400);
        //   });
        // });
        // // eslint-disable-next-line max-len
        // describe("5. The Verifier's Verify Presentation HTTP API MUST support the verification of, JSON-LD Proof, Ed25519Signature2018.", () => {
        //   it('should pass', async () => {
        //     const [vp] = verifiablePresentations
        //       .map((item: any) => item.data)
        //       .find((p: any) => {
        //         return p.type === 'Ed25519Signature2018';
        //       });
        //     console.log(vp);
        //     // const body = {
        //     //   verifiablePresentation: vp,
        //     //   options: {
        //     //     challenge: vp.proof.challenge,
        //     //     domain: vp.proof.domain,
        //     //     checks: ['proof'],
        //     //   },
        //     // };
        //     // const res = await httpClient.postJson(verifierEndpoint, body, {});
        //     // expect(res.status).toBe(200);
        //     // expect(res.body.checks).toEqual(['proof']);
        //   });
        // });
    });
}
