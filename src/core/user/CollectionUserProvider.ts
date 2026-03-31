import type User from "./User";

export default interface CollectionUserProvider {
    inserir(user: User):Promise<void>
    findByEmail(email: string):Promise<User|null>
}