import type CollectionTransaction from "./CollectionTransactionProvider";
import type { UseCase } from "../shared/UseCase";
import type Transaction from "./Transction";
import Id from "../shared/Id";

interface TransactionDTO {
    id?: string
    descricao: string
    valor: number
    vencimento: Date
    idUsuario: string
}

export default class SaveTransaction implements UseCase<TransactionDTO, void> {
    constructor(
        private db: CollectionTransaction
    ) { }

    async execute(transactionDTO: TransactionDTO): Promise<void> {
            if(transactionDTO.id) {
                await this.db.update(
                    transactionDTO as Transaction
                )
                return
            }

            const transaction: Transaction = {
                id: Id.gerar(),
                descricao: transactionDTO.descricao,
                valor: transactionDTO.valor,
                vencimento: transactionDTO.vencimento,
                idUsuario: transactionDTO.idUsuario
            }
    
            await this.db.insert(transaction)
    }
}