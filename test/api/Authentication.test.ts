import User from '../../src/core/user/User'
import axios from "axios"
import '../.env'

const baseURL = process.env.BASE_URL

test('Deve registrar um usuário se ele não existir', async ()=>{
    const user: Partial<User> = {
        nome: 'Diego Sousa',
        email: 'diego@gmail.com',
        senha: '12345678',
    }

    try{
        const res = await axios.post(`${baseURL}/register`, user)
        expect(res.status).toBe(201)
    } catch(e: any) {
        expect(e.response?.status).toBe(400)
        expect(e.response?.data).toBe('User already exists')
    }
})