import User from '../../src/core/user/User'
import axios from "axios"
import '../.env'

import users from '../data/users'

const baseURL = process.env.BASE_URL

interface LoginResponse {
    user: {
        id: string
        nome: string
        email: string
    }
    token: string
}

const user: Partial<User> = {
    nome: users.full.nome,
    email: users.full.email,
    senha: users.full.senha,
}

test.skip('Deve registrar um usuário se ele não existir', async ()=>{
    try{
        const res = await axios.post(`${baseURL}/register`, user)
        expect(res.status).toBe(201)
    } catch(e: any) {
        expect(e.response?.status).toBe(400)
        expect(e.response?.data).toBe('User already exists')
    }
})

test('Deve logar um usuário se ele existir', async ()=> {
    const res = await axios.post<LoginResponse>(`${baseURL}/login`, { email: user.email, senha: user.senha })
    expect(res.data.user.nome).toBe(user.nome)
    expect(res.data.user.email).toBe(user.email)
    expect(res.data.token).toBeDefined()
})

test('Deve retornar erro ao logar com senha ou email errados', async ()=> {
    try{
        await axios.post<LoginResponse>(`${baseURL}/login`, { email: user.email, senha: '...' })
    } catch(err: any) {
        expect(err.response.status).toBe(403)
        expect(err.response.data).toBe('Incorrect password or email')
    }
})