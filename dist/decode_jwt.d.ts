export declare function decode_jwt(secret: string, jwt: string): {
    id: string;
    payload: object;
    expires_at: Date;
};
