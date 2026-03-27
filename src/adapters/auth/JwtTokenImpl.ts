import type TokenProvider from "../../core/user/TokenProvider";
import { type JwtPayload } from "jsonwebtoken";
import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET || 'your secret'

export default class JwtTokenImpl implements TokenProvider {
    generate(email: string, senha: string): string {
        const payload: JwtPayload = {email, senha}
        return jwt.sign(payload, secret, { expiresIn: '1h' })
    }
}