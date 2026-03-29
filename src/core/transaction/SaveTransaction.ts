import { randomUUID } from "node:crypto";
import type { UseCase } from "../shared/UseCase";
import type Transaction from "./Transction";

export default class SaveTransaction implements UseCase<void, Transaction>{
    constructor(

    ){}
    execute(): Promise<Transaction> {
        const transaction: Transaction = {
            id: randomUUID(),
            descricao: '',
            valor: 25645,
            vencimento: new Date(),
            idUsuario: 'id...'
        }
        return Promise.resolve(transaction);
    }
}