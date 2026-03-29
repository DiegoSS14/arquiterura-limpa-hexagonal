import BcryptAdapter from '../../src/adapters/auth/BcryptAdapter'
import PasswordInvertAdapter from '../../src/adapters/auth/PasswordInvertAdapter'
import UserInMemory from '../fake/UserInMemory'
import UserCollectionDB from '../../src/adapters/db/UserCollectionDB'
import User from '../../src/core/user/User'
import RegisterUser from '../../src/core/user/UserRegister'

import users from '../data/users'

test('Deve cadastrar o usuário', async () => {
    const banco = new UserInMemory()
    const criptografar = new PasswordInvertAdapter()
    const useCase = new RegisterUser(banco, criptografar)

    const usuario: User = await useCase.execute({ nome: users.full.nome, email: users.full.email, senha: users.full.senha! })
    expect(usuario).toHaveProperty('id')
    expect(usuario.nome).toBe('Diego Sousa')
    expect(usuario.senha).toBe('654321')
})

test('Deve comparar as senhas corretamente', () => {
    const bcrypt = new BcryptAdapter()
    const senhaCrypto = bcrypt.criptografar('123456')

    expect(bcrypt.comparar('123456', senhaCrypto)).toBe(true)
})

test.skip('Deve cadastrar o usuário real no banco de dados', async () => {
    const banco = new UserCollectionDB()
    const criptografar = new BcryptAdapter()
    const useCase = new RegisterUser(banco, criptografar)

    const emailUnico = `diego+${Date.now()}@gmail.com`

    const usuario: User = await useCase.execute({ nome: users.full.nome, email: emailUnico, senha: users.full.senha! })
    expect(usuario).toHaveProperty('id')
    expect(usuario.nome).toBe('Diego Sousa')
})

test.skip('Deve receber erro ao cadastrar usuário com e-mail duplicado', async () => {
    const banco = new UserCollectionDB()
    const criptografar = new BcryptAdapter()
    const useCase = new RegisterUser(banco, criptografar)
    const email = `diego+duplicado-${Date.now()}@gmail.com`

    await useCase.execute({
        nome: users.full.nome,
        email,
        senha: users.full.senha!
    })

    await expect(
        useCase.execute({
            nome: 'Diego Sousa 2',
            email,
            senha: '654321'
        })
    ).rejects.toThrow('User already exists')
})