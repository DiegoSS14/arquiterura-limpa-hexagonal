import type Transaction from "./Transction";

export default interface CollectionTransaction {
    insert(transaction: Transaction): Promise<void>
    update(transaction: Transaction): Promise<Transaction>
    findById(userId: string, id: string): Promise<Transaction | null>
    findByMonth(userId: string, year: number, month: number): Promise<Transaction[]>
}