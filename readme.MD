# JWT Encoder/Decoder Library

A type-safe library for encoding and decoding JSON Web Tokens (JWTs).

## Installation

Install the library using npm:

```npm install npm_jwt_tllib```

```import { encode_jwt, decode_jwt, validate_jwt } from 'npm_jwt_tllib';```

## Function: ```encode_jwt (secret, id, payload, options)```
### Parameters
- ```secret (string)```: The secret key used to sign the JWT  Must be a string.
- ```id (string | number)```: The unique identifier for the token. Must be a string or a number.
- ```payload (object)```: The payload to include in the JWT. Must be an object.
- ```ttl (number) (optional)```: The time-to-live for the token in seconds. If provided, the token will expire after this duration.
- ```options (object) (optional)```: Additional options for the JWT. (Currently not used in this implementation.)

#### Interface: ```payload_spec```
The payload object can contain the following properties:
- ```data (string) (optional)```: Custom data to include in the payload.
- ```id (string) (optional)```: The unique identifier for the token. This will be set to the id parameter if provided.
- ```iat (number) (optional)```: Issued at time. Defaults to the current timestamp.
- ```exp (number) (optional)```: Expiration time. Will be set based on the ttl parameter if provided.
- ```nbf (number) (optional)```: Not before time.
- ```iss (string) (optional)```: Issuer.
- ```sub (string) (optional)```: Subject.
- ```[key: string]: any (optional)```: Any additional properties.(not supported currently)

### Returns
    - ```(string)```: The encoded JWT.

## Function: ```decode_jwt (secret, jwt) ```
## Parameters

- ```secret (string)```: The secret key used to sign the JWT. Must be a string.
- ```jwt (string)```: The JWT string to decode. Must be a string.

### Returns

- ```(object)```: An object containing the id, payload, and expires_at properties.

## Function: ```validate_jwt (secret, jwt)```
### Parameters

- ```secret (string)```: The secret key used to sign the JWT. Must be a string.
- ```jwt (string)```: The JWT string to validate. Must be a string.

### Returns

- ```(boolean)```: Returns true if the JWT is valid, otherwise false.
