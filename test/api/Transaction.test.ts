import axios from "axios"
import '../.env'
import { getAuthorizationHeader } from "../util/auth"

const baseURL = process.env.BASE_URL

test('Deve retornar uma transação', async ()=> {
    const headers = await getAuthorizationHeader()
    const res = await axios.post(`${baseURL}/transaction`, {}, headers)
    expect(res.status).toBe(200)
})