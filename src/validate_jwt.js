"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate_jwt = validate_jwt;
const crypto_js_1 = __importDefault(require("crypto-js"));
const b64 = require('./b64.ts');
const b64encode = b64.b64encode;
const b64decode = b64.b64decode;
const decode_jwt = require('./decode_jwt');
const header = Object.assign({
    alg: 'HS256',
    typ: 'JWT',
});
function validate_jwt(secret, jwt) {
    console.log(typeof jwt);
    if (typeof jwt !== 'string') {
        throw new Error('"jwt" must be a string!');
    }
    if (typeof secret !== 'string') {
        throw new Error('"secret" must be a string!');
    }
    // decode JWT
    const { payload, id, expires_at } = decode_jwt(secret, jwt);
    const [enc_header, enc_payload, enc_sign] = jwt.split('.');
    // create signature
    const new_payload = b64encode(JSON.stringify(payload));
    const signature = crypto_js_1.default.HmacSHA256(`${enc_header}.${new_payload}`, secret).toString();
    const signb64 = b64encode(signature);
    //console.log(enc_sign);
    //console.log(signb64);
    // verify if the signature is correct
    if (enc_sign !== signb64) {
        return false;
    }
    // check validity
    const currtime = new Date();
    if (expires_at <= currtime) {
        return false; // expired
    }
    if (typeof payload.id !== 'string' && typeof payload.id === 'undefined') {
        return false; //undefined or not a string
    }
    if (typeof payload.data !== 'string' && typeof payload.data === 'undefined') {
        return false; //undefined or not a string
    }
    // not caught any ifs
    return true;
}
//const secret = 'secret';
//const jwt = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiZm9vLWJhciIsImV4cCI6MTcyMjAyMjQ3MSwiaWQiOiIxMjMifQ.YjMzODA2OGRkZGQxMDA3MjAwNTRjOGY2YTlhNjJiNjlhY2I5MGExZWZlOTk1Njg2YzQ0NTc5NTE1NTJmOWI1OA";
//console.log(validate_jwt(secret, jwt));
//module.exports = validate_jwt;
