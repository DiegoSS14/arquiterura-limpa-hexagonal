import type Transaction from "./Transction";

export interface SaldoDTO {
    total: number
    receita: number
    despesas: number
}

export default class Saldo{
    constructor(
        private transacoes: Transaction[] 
    ) {}

    get dto(): SaldoDTO {
        return {
            total: this.total,
            receita: this.receita,
            despesas: this.despesas,
        }
    }

    get total() {
        return this.transacoes.reduce(this._getTotal, 0)
    }

    get receita() {
        let total = 0 
        this.transacoes.map(t=>{
            if(t.valor > 0) total += t.valor
        })
        return total
    }

    get despesas() {
        let total = 0 
        this.transacoes.map(t=>{
            if(t.valor < 0) total += t.valor
        })
        return total
    }

    private _getTotal(total: number, transaction: Transaction) {
        return total += transaction.valor
    }
}