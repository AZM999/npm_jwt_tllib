const b64 = require('./b64.ts')
const b64encode = b64.b64encode;

import CryptoJS from 'crypto-js'


/**
 * 
 */
interface payload_spec{
    data?: string;
    id?: string;
    iat?: number;
    exp?: number;
    nbf?: number;
    iss?: string;
    sub?: string;
    [key: string]: any;  // all additional payloads.
  }

  /**
   * 
   * @param secret 
   * @param id 
   * @param payload 
   * @param ttl 
   */
  
  // Create signature to sign
  // encode functions creates the JWT with the suppplied params, 
  // for validation pass the JWT to validate
  
  export function encode_jwt(secret: string, id: string | number, payload: payload_spec, ttl?: number, options?: object): string
  {
    // param check
    if ( typeof secret !== "string" )
    {
      throw new Error('"secret" must be a String!');
    }
    if ( typeof id !== "string" && typeof id !== "number")
    {
      throw new Error('"id" must be a String or a Valid Number!');
    }
    if (!(typeof payload === 'object') && !Buffer.isBuffer(payload)) 
      throw new Error('"payload" is required and must be an object.');
  
    const header = Object.assign(
      {
        alg: 'HS256',  // add more algo with options
        typ: 'JWT',
      });
  
    const enc_header = b64encode (header);
    
    // copy of payload into interface obj
    let new_payload: payload_spec = payload;
  
    const timestamp = new_payload.iat || Math.floor (Date.now() / 1000);
    if (typeof ttl !== 'undefined')
    {
      new_payload.exp =  timestamp + ttl;
    }

    // force id to be string
    if (typeof id === 'number' ){
      id = id.toString();
    }
    new_payload.id = id;

    const enc_payload = b64encode (JSON.stringify(new_payload));
    const signature = CryptoJS.HmacSHA256(`${enc_header}.${enc_payload}`, secret).toString();
    const enc_sign  = b64encode (signature);
    
    return `${enc_header}.${enc_payload}.${enc_sign}`;
  
  }

//console.log (encode_jwt('secret',123, {data: 'foo-bar'}, 60 * 60));
//module.exports = encode_jwt;