import type { UseCase } from "../shared/UseCase";
import type User from "../user/User";
import type CollectionTransactionProvider from "./CollectionTransactionProvider";
import type { SaldoDTO } from "./Saldo";
import Saldo from "./Saldo";
import type Transaction from "./Transction";

interface inputExtratoMensal {user: User, year: number, month: number}
interface outputExtratoMensal {transacoes: Transaction[], saldo: SaldoDTO}

export default class ExtratoMensal implements UseCase<inputExtratoMensal, outputExtratoMensal>{
    constructor(
        private collection: CollectionTransactionProvider
    ){}

    async execute(dto: inputExtratoMensal): Promise<outputExtratoMensal> {
        const transactions = await this.collection.findByMonth(dto.user.id, dto.year, dto.month)
        const instanceSaldo = new Saldo(transactions)
        const saldo = instanceSaldo.dto

        return {transacoes: transactions, saldo}
    }
}