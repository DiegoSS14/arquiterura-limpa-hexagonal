import type CollectionTransactionProvider from "../../core/transaction/CollectionTransactionProvider";
import type Transaction from "../../core/transaction/Transction";
import db from "./conection";

export default class implements CollectionTransactionProvider {
    insert(transaction: Transaction): Promise<void> {
        return db.table('transacoes').insert(this._toTable(transaction))
    }

    update(transaction: Transaction): Promise<Transaction> {
        return db.table('transacoes').update(this._toTable(transaction))
    }

    async findById(userId: string, id: string): Promise<Transaction | null> {
        const transactions = await db
            .table('transacoes')
            .where({ id, usuario_id: userId })

        if (transactions.length === 0) return null
        return this._fromTable(transactions[0])
    }

    async findByMonth(userId: string, year: number, month: number): Promise<Transaction[]> {
        const transactions =  await db.table('transacoes')
            .where('usuario_id', userId)
            .whereRaw('extract(year from vencimento) = ?', year)
            .whereRaw('extract(month from vencimento) = ?', month)

            return transactions.map(this._fromTable)
    }

    // Converte os campos da aplicação para os tipos da tabela
    private _toTable(transaction: Transaction): any {
        return {
            id: transaction.id,
            descricao: transaction.descricao,
            valor: transaction.valor,
            vencimento: transaction.vencimento.toISOString(),
            usuario_id: transaction.idUsuario
        }
    }

    // Converte os tipos da tabela para o tipo da aplicação
    // Importante converter pra manter a consistência ao consumir em outros lugares da aplicação
    private _fromTable(transaction: any): Transaction {
        return {
            id: transaction.id,
            descricao: transaction.descricao,
            valor: Number(transaction.valor),
            vencimento: new Date(transaction.vencimento),
            idUsuario: transaction.id_usuario
        }
    }
}