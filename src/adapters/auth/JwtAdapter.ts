import type TokenProvider from "../../core/user/TokenProvider";
import { type JwtPayload } from "jsonwebtoken";
import jwt from "jsonwebtoken";

export default class JwtTokenImpl implements TokenProvider {
    constructor(private secret: string) {}
    generate(payload: object | string): string {
        return jwt.sign(payload, this.secret, { expiresIn: '1h' })
    }
    
    validar(token: string): string | object {
        return jwt.verify(token.replace('Bearer ', ''), this.secret)
    }
}