import type User from "./User";

export default interface CollectionProvider {
    inserir(user: User):Promise<void>
    findByEmail(email: string):Promise<User|null>
}