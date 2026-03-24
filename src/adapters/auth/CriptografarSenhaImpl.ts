import type CriptografarSenha from "../../core/user/EncryptionProvider";

export default class CriptografarSenhaImpl implements CriptografarSenha{
    comparar(senha: string, senhaCripto: string): boolean {
        const senhaFornecida = this.criptografar(senha)
        return senhaFornecida === senhaCripto
    }
    criptografar(senha: string): string {
        return senha.split('').reverse().join('')
    }
}