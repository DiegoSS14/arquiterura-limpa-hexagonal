import type Banco from "../ports/Banco"
import type CriptografarSenha from "../ports/Criptografia"
import type User from "./User"


export default class CadastrarUsuario {

    private db: Banco
    private criptografarSenha: CriptografarSenha

    constructor(db: any, criptografarSenha: any) {
        this.db = db
        this.criptografarSenha = criptografarSenha
    }

    executar(nome: string, email: string, senha: string): User {
        const id = Math.floor(Math.random())
        const senhaCripto = this.criptografarSenha.criptografar(senha)

        const usuario: User = {
            id: `${id}`,
            nome: nome,
            email: email,
            senha: senhaCripto
        }

        return this.db.inserir(usuario)
    }
}