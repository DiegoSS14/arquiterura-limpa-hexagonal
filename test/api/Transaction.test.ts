import axios from "axios"
import '../.env'
import { getAuthorizationHeader } from "../util/auth"
import transactions from "../data/transactions"

const baseURL = process.env.BASE_URL

test('Deve retornar uma transação', async ()=> {
    const headers = await getAuthorizationHeader()

    const transaction = transactions.semId

    const res = await axios.post(`${baseURL}/transaction`, transaction, headers)
    expect(res.status).toBe(200)
})