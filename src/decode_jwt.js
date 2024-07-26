"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decode_jwt = decode_jwt;
const b64 = require('./b64.ts');
const b64decode = b64.b64decode;
function decode_jwt(secret, jwt) {
    if (typeof jwt !== 'string') {
        throw new Error('"jwt" must be a string!');
    }
    if (typeof secret !== 'string') {
        throw new Error('"secret" must be a string!');
    }
    const parts = jwt.split('.');
    if (parts.length !== 3) {
        throw new Error('Invalid JWT format!');
    }
    const [enc_header, enc_payload, enc_sign] = parts;
    // decode header and payload
    const header_ = b64decode(enc_header);
    var payload_ = b64decode(enc_payload);
    let header;
    let payload;
    try {
        header = JSON.parse(header_);
        payload = JSON.parse(payload_);
    }
    catch (err) {
        throw new Error('Invalid JSON in JWT header or payload!');
    }
    const id = payload.id;
    const expires_at = new Date(payload.exp * 1000);
    return { payload, id, expires_at };
}
//const jwt = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiZm9vLWJhciIsImV4cCI6MTcyMjAyMDc5MiwiaWQiOiIxMjMifQ.MjkxNzdhMDRjZWM4M2IyMzAzM2VmNjY3NTUzMDVhNjk3YzVjMmE1MTJhMmMyYjViYTNmY2Q3YTJkYWY2MTI4Mg";
//console.log ( decode_jwt('secret',jwt));
module.exports = decode_jwt;
