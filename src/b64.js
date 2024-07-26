"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.b64decode = b64decode;
// encode to B64 string
function b64encode(str) {
    // handle object
    if (typeof str === 'object') {
        str = JSON.stringify(str);
    }
    var str_utf8 = unescape(encodeURIComponent(str)); //utf8.encode(str);
    var b64_str_utf8 = btoa(str_utf8);
    return b64_str_utf8.replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
}
// decode b64 string
function b64decode(str) {
    // url safe and utf8 compliant b64
    // / -> '_'
    // + -> '-'
    // = -> ''
    var replaced = str.replace(/\-/g, '+').replace(/\_/g, '/');
    var b64_str = atob(replaced);
    var b64_str_utf8 = decodeURIComponent(escape(b64_str)); //utf8.decode(b64_str);
    return b64_str_utf8;
}
// debug
const header = {
    "alg": "HS256",
    "typ": "JWT"
};
const enc_header = b64encode(header);
//console.log (enc_header);
//console.log (b64decode(enc_header))
module.exports = { b64encode, b64decode };
