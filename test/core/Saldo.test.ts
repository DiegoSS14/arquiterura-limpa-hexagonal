import Saldo from "../../src/core/transaction/Saldo"
import ExtratoMensal from "../../src/core/transaction/ExtratoMensal"
import Transaction from "../../src/core/transaction/Transction"
import transactions from "../data/transactions"
import TransactionInMemory from '../fake/TransactionInMemory'
import users from "../data/users"

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

test('Deve retornar o total de transações', async () => {
    const transacoes= [
        {...transactions.semId, valor: 500},
        {...transactions.semId, valor: 200},
        {...transactions.semId, valor: 300},
        {...transactions.semId, valor: -200},
        {...transactions.semId, valor: -100},
    ] as Transaction[]

    const user = users.full
    
    const collection = new TransactionInMemory()
    await Promise.all(transacoes.map(t => collection.insert({ ...t, idUsuario: user.id })))

    let saldo = new ExtratoMensal(collection)
    let res = await saldo.execute({user, year: 2026, month: 4})
    expect(res.transacoes).toEqual(expect.arrayContaining(transacoes.map(t => ({ ...t, idUsuario: user.id }))))
})