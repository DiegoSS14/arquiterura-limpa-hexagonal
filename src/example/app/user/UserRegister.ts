import type UserCollection from "./UserCollection"
import type EncryptionProvider from "./EncryptionProvider"
import type User from "./User"
import Id from "../shared/Id"


export default class CadastrarUsuario {
    constructor(
        private collection: UserCollection, 
        private encryptionProvider: EncryptionProvider
    ){}

    executar(nome: string, email: string, senha: string): User {
        const id = Math.floor(Math.random())
        const senhaCripto = this.encryptionProvider.criptografar(senha)

        const user: User = {
            id: Id.gerar(),
            nome: nome,
            email: email,
            senha: senhaCripto
        }

        this.collection.inserir(user)
        return user
    }
}