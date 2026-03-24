import type User from "./User";

export default interface UserCollection {
    inserir(user: User):Promise<void>
    findByEmail(email: string):Promise<User|null>
}