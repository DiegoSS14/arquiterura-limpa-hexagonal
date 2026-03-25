import type EncryptionProvider from "./EncryptionProvider";
import type UserCollection from "./UserCollection";

interface UserDTO {
    id: string
    nome: string
    email: string
}

interface UserOutput {
    user: UserDTO
    token: string
}

export default class UserLogin {
    constructor(
        private collection: UserCollection,
        private encryptionProvider: EncryptionProvider
    ) {}

    async execute(email: string, senha: string): Promise<UserOutput> {
        const userFinded = await this.collection.findByEmail(email)
        if (!userFinded) throw new Error('Incorrect password or email')

        const correctPassword = this.encryptionProvider.comparar(senha, userFinded.senha!)
        if (!correctPassword) throw new Error('Incorrect password or email')

        const user: UserDTO = {
            id: userFinded.id,
            nome: userFinded.nome,
            email: userFinded.email,
        }

        return {
            user: user,
            token: 'token'
        }
    }
}