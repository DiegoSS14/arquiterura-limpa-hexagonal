import type UserCollection from "./UserCollection"
import type EncryptionProvider from "./EncryptionProvider"
import type User from "./User"
import Id from "../shared/Id"


export default class UserRegister {
    constructor(
        private collection: UserCollection, 
        private encryptionProvider: EncryptionProvider
    ){}

    async execute(nome: string, email: string, senha: string): Promise<User> {
        const senhaCripto = this.encryptionProvider.criptografar(senha)

        const user: User = {
            id: Id.gerar(),
            nome: nome,
            email: email,
            senha: senhaCripto
        }

        const userAlreadyExists = await this.collection.findByEmail(user.email)
        if(userAlreadyExists) throw new Error('User already exists')

        await this.collection.inserir(user)
        return user
    }
}