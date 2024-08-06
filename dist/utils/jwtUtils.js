"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signJWT = signJWT;
exports.verifyJWT = verifyJWT;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const keys_1 = require("../config/keys");
function signJWT(payload, options) {
    if (!options)
        return;
    return jsonwebtoken_1.default.sign(payload, keys_1.privateKey, Object.assign(Object.assign({}, options), { algorithm: "RS256" }));
}
function verifyJWT(accessToken) {
    try {
        const decodedToken = jsonwebtoken_1.default.verify(accessToken, keys_1.publicKey);
        return {
            valid: true,
            expired: false,
            decodedToken,
        };
    }
    catch (err) {
        //if token can't be verified we will return this object
        return {
            valid: false,
            expired: err.message === "jwt expired",
            decodedToken: null,
        };
    }
}
