import type User from "../../../app/user/User";
import type UserCollection from "../../../app/user/UserCollection";
import connection from "./connection";

export default class UserCollectionDB implements UserCollection{
    async inserir(user: User) {
        await connection.table('usuarios').insert(user)
    }
}