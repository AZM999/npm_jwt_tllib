/**
 *
 */
interface payload_spec {
    data?: string;
    id?: string;
    iat?: number;
    exp?: number;
    nbf?: number;
    iss?: string;
    sub?: string;
    [key: string]: any;
}
/**
 *
 * @param secret
 * @param id
 * @param payload
 * @param ttl
 */
export declare function encode_jwt(secret: string, id: string | number, payload: payload_spec, ttl?: number, options?: object): string;
export {};
