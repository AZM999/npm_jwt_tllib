"use strict";
// AZM
// 24/07/2024
// JWT ENCODER, DECODER
Object.defineProperty(exports, "__esModule", { value: true });
const b64 = require('./b64.ts');
const b64encode = b64.b64encode;
const b64decode = b64.b64decode;
const tok = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9.TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ";
var splitted = tok.split(".", 3);
var header = splitted[0];
var payload = splitted[1];
var sign = splitted[2];
console.log("header:", header, "\npayload:", payload, "\nsignature:", sign);
var strn = atob(header);
console.log(strn);
console.log(b64encode(strn));
//check 
// console.log ("b64encode:", b64encode(strn));
// var str1 = b64encode (strn);
// console.log ("b64decoded", b64decode(str1));
// make a test function to simply encode and decode a JWT with SH256
// make it typesafe
// support all algos
// tests?
