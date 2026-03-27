import type User from "../../core/user/User"
import type UserCollection from "../../core/user/CollectionProvider"

export default class UserInMemory implements UserCollection{
    private static db: any = []
    
    async inserir(user: User) {
        UserInMemory.db.push(user)
    }

    findByEmail(email: string): Promise<User | null> {
        const list: any[] = UserInMemory.db
        const finded = list.find(u=>u.email === email)
        return finded
    }
}