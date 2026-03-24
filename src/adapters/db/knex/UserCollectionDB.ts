import type User from "../../../core/user/User";
import type UserCollection from "../../../core/user/UserCollection";
import collection from "./collection";

export default class UserCollectionDB implements UserCollection{
    async inserir(user: User) {
        await collection.table('usuarios').insert({
            id: user.id,
            nome: user.nome,
            email: user.email,
            senha: user.senha,
        })
    }

    async findByEmail(email: string): Promise<User | null> {
        const user = await collection.table('usuarios').where('email', email).first<User>()
        return user ?? null
    }
}