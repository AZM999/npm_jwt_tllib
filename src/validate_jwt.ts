import CryptoJS from 'crypto-js'
const b64 = require('./b64.ts')
const b64encode = b64.b64encode;
const b64decode = b64.b64decode;
const decode_jwt = require('./decode_jwt');


const header = Object.assign(
{
    alg: 'HS256',
    typ: 'JWT',
});

interface payload_spec{
    id?: string;
    iat?: number;
    exp?: number;
    nbf?: number;
    iss?: string;
    sub?: string;
    [key: string]: any;  // all additional payloads.
}


export function validate_jwt(secret: string, jwt: string): boolean
{
    console.log (typeof jwt);
    if (typeof jwt !== 'string') {
        throw new Error('"jwt" must be a string!');
    }
    if (typeof secret !== 'string') {
        throw new Error('"secret" must be a string!');
    }

    // decode JWT
    const {payload, id, expires_at} = decode_jwt(secret, jwt);
    const [enc_header, enc_payload, enc_sign] = jwt.split('.');


    // create signature
    const new_payload = b64encode (JSON.stringify(payload));
    const signature = CryptoJS.HmacSHA256(`${enc_header}.${new_payload}`, secret).toString();
    const signb64  = b64encode (signature);

    //console.log(enc_sign);
    //console.log(signb64);

    // verify if the signature is correct
    if (enc_sign !== signb64){
        return false;
    }

    // check validity
    const currtime = new Date();
    if (expires_at <= currtime){
        return false; // expired
    }

    if (typeof payload.id !== 'string' && typeof payload.id === 'undefined'){
        return false; //undefined or not a string
    }

    if (typeof payload.data !== 'string' && typeof payload.data === 'undefined'){
        return false; //undefined or not a string
    }

    // not caught any ifs
    return true;
}

//const secret = 'secret';
//const jwt = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiZm9vLWJhciIsImV4cCI6MTcyMjAyMjQ3MSwiaWQiOiIxMjMifQ.YjMzODA2OGRkZGQxMDA3MjAwNTRjOGY2YTlhNjJiNjlhY2I5MGExZWZlOTk1Njg2YzQ0NTc5NTE1NTJmOWI1OA";
//console.log(validate_jwt(secret, jwt));

//module.exports = validate_jwt;