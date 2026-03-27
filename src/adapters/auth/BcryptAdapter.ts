import type Criptografia from "../../core/user/EncryptionProvider"
import { genSaltSync, hashSync, compareSync } from 'bcrypt'

export default class CriptografarBcrypt implements Criptografia{
    criptografar(senha: string): string {
        const salt = genSaltSync(10)
        return hashSync(senha, salt);
    }
    comparar(senha: string, senhaCripto: string): boolean {
        return compareSync(senha, senhaCripto)
    }
}