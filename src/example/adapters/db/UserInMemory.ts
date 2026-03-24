import type User from "../../app/user/User"
import type UserCollection from "../../app/user/UserCollection"

export default class UserInMemory implements UserCollection{
    private static db: any = []

    async inserir(user: User) {
        UserInMemory.db.push(user)
    }
}