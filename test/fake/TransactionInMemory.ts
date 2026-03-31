import type Transaction from "../../src/core/transaction/Transction"
import type CollectionTransactionProvider from "../../src/core/transaction/CollectionTransactionProvider"

export default class UserInMemory implements CollectionTransactionProvider {
    private db: Transaction[] = []

    insert(transaction: Transaction): Promise<void> {
        this.db.push(transaction)
        return Promise.resolve()
    }
    async update(transaction: Transaction): Promise<Transaction> {
        const index = this.db.findIndex(t => t.id === transaction.id)
        if (index < 0) throw new Error('Transaction not found')
        this.db[index] = transaction
        return this.db[index]
    }
    async findById(userId: string, id: string): Promise<Transaction | null> {
        const result = this.db.find(t => t.id === id && t.idUsuario === userId)
        return result ?? null
    }
    async findByMonth(userId: string, year: number, month: number): Promise<Transaction[]> {
        return this.db.filter(t => {
            const date = new Date(t.vencimento)
            return t.idUsuario === userId && date.getUTCFullYear() === year && (date.getUTCMonth() + 1) === month
        })
    }

}