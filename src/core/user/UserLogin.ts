import type { UseCase } from "../shared/UseCase";
import type EncryptionProvider from "./EncryptionProvider";
import type UserCollection from "./CollectionUser";
import type TokenProvider from "./TokenProvider";

export type UserDTO = { id: string, nome: string, email: string }
export type UserLoginDTO = { email: string, senha: string }
export type UserLoginOutput = { user: UserDTO, token: string }

export default class UserLogin implements UseCase<UserLoginDTO, UserLoginOutput> {
    constructor(
        private collection: UserCollection,
        private token: TokenProvider,
        private encryptionProvider: EncryptionProvider,
    ) { }

    async execute(dto: UserLoginDTO): Promise<UserLoginOutput> {
        const userFinded = await this.collection.findByEmail(dto.email)
        if (!userFinded) throw new Error('Incorrect password or email')

        const correctPassword = this.encryptionProvider.comparar(dto.senha, userFinded.senha!)
        if (!correctPassword) throw new Error('Incorrect password or email')

        const user: UserDTO = {
            id: userFinded.id,
            nome: userFinded.nome,
            email: userFinded.email,
        }

        return {
            user: user,
            token: this.token.generate({
                nome: userFinded.nome,
                email: userFinded.email,
                senha: userFinded.senha
            })
        }
    }
}