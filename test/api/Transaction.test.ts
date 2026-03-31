import axios from "axios"
import '../.env'
import { getAuthorizationHeader } from "../util/auth"
import transactions from "../data/transactions"
import users from "../data/users"

const baseURL = process.env.BASE_URL

test.skip('Deve inserir uma transação no banco de dados', async ()=> {
    const headers = await getAuthorizationHeader()

    const transaction = transactions.semId

    const res = await axios.post(`${baseURL}/transaction`, transaction, headers)
    expect(res.status).toBe(200)
})

test('Deve atualizar um item no banco de dados', async ()=>{
    const headers = await getAuthorizationHeader()

    const transaction = {
        ...transactions.semId,
        valor: Math.floor(Math.random() * 100),
        id: 'a512188c-6c8a-4a42-817d-6d4afbc81318'
    }

    const res = await axios.post(`${baseURL}/transaction`, transaction, headers)
    expect(res.status).toBe(200)
    console.log(transaction)
})

test('Deve retornar o extrato mensal + saldo consolidado', async ()=>{
    const headers = await getAuthorizationHeader()

    const res = await axios.get(`${baseURL}/transaction/2026/4`, headers)
    expect(res.status).toBe(200)
    expect(res.data).toHaveProperty('transacoes')
    expect(res.data).toHaveProperty('saldo')
    console.log(res.data)
})