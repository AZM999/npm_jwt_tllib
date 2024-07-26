"use strict";
// AZM
// 24/07/2024
// JWT ENCODER, DECODER
const encode_jwt = require('./encode_jwt');
const decode_jwt = require('./decode_jwt');
const validate_jwt = require('./validate_jwt');
const tok = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9.TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ";
var splitted = tok.split(".", 3);
var header = splitted[0];
var payload = splitted[1];
var sign = splitted[2];
//console.log ("header:",header, "\npayload:",payload, "\nsignature:",sign);
var strn = atob(header);
//console.log (strn);
//console.log (b64encode(strn));
const jwt = (encode_jwt('secret', 123, { data: 'foo-bar' }, 60 * 60));
console.log("jwt: ", jwt);
const dec_jwt = decode_jwt('secret', jwt);
console.log(dec_jwt);
console.log("string: ");
if (typeof jwt === 'string') {
    console.log(true);
}
console.log(validate_jwt(jwt));
//check 
// console.log ("b64encode:", b64encode(strn));
// var str1 = b64encode (strn);
// console.log ("b64decoded", b64decode(str1));
// make a test function to simply encode and decode a JWT with SH256
// make it typesafe
// support all algos
// tests?
