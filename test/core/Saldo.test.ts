import Saldo from "../../src/core/transaction/Saldo"
import Transaction from "../../src/core/transaction/Transction"
import transactions from "../data/transactions"

test('Deve retornar o total de transações', () => {
    const transacoes = [
        {...transactions.semId, valor: 500},
        {...transactions.semId, valor: 200},
        {...transactions.semId, valor: 300},
        {...transactions.semId, valor: -200},
        {...transactions.semId, valor: -100},
    ] as Transaction[]

    let saldo = new Saldo(transacoes)
    expect(saldo.total).toBe(700)
})

test('Deve retornar o total de transações', () => {
    const transacoes = [
        {...transactions.semId, valor: 500},
        {...transactions.semId, valor: 200},
        {...transactions.semId, valor: 300},
        {...transactions.semId, valor: -200},
        {...transactions.semId, valor: -100},
    ] as Transaction[]

    let saldo = new Saldo(transacoes)
    expect(saldo.receita).toBe(1000)
})

test('Deve retornar o total de transações', () => {
    const transacoes= [
        {...transactions.semId, valor: 500},
        {...transactions.semId, valor: 200},
        {...transactions.semId, valor: 300},
        {...transactions.semId, valor: -200},
        {...transactions.semId, valor: -100},
    ] as Transaction[]

    let saldo = new Saldo(transacoes)
    expect(saldo.despesas).toBe(-300)
})