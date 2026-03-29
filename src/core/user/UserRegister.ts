import type UserCollection from "./CollectionUserProvider"
import type EncryptionProvider from "./EncryptionProvider"
import type User from "./User"
import Id from "../shared/Id"
import type { UseCase } from "../shared/UseCase"

export type UserRegisterInputDTO = {nome: string, email: string, senha: string}

export default class UserRegister implements UseCase<UserRegisterInputDTO, User> {
    constructor(
        private collection: UserCollection, 
        private encryptionProvider: EncryptionProvider
    ){}

    async execute(dto: UserRegisterInputDTO): Promise<User> {
        const senhaCripto = this.encryptionProvider.criptografar(dto.senha)

        const user: User = {
            id: Id.gerar(),
            nome: dto.nome,
            email: dto.email,
            senha: senhaCripto
        }

        const userAlreadyExists = await this.collection.findByEmail(user.email)
        if(userAlreadyExists) throw new Error('User already exists')

        await this.collection.inserir(user)
        return user
    }
}