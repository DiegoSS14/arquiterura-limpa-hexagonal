import type User from "./User";
import type UserCollection from "./UserCollection";

export default class {
    constructor(
        private db: UserCollection
    ) {}

    async executar(email: string): Promise<User | null> {
        const user = await this.db.findByEmail(email)
        return user ?? null
    }
}