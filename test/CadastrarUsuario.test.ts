import CriptografarBcrypt from '../src/example/adapters/auth/CriptografarBcrypt'
import CriptografarSenhaImpl from '../src/example/adapters/auth/CriptografarSenhaImpl'
import UserInMemory from '../src/example/adapters/db/UserInMemory'
import UserCollectionDB from '../src/example/adapters/db/knex/UserCollectionDB'
import User from '../src/example/app/user/User'
import RegisterUser from '../src/example/app/user/UserRegister'

test('Deve cadastrar o usuário', async () => {
    const banco = new UserInMemory()
    const criptografar = new CriptografarSenhaImpl()
    const useCase = new RegisterUser(banco, criptografar)
    
    const usuario: User = await useCase.executar('Diego Sousa', 'diego@gmail.com', "123456")
    expect(usuario).toHaveProperty('id')
    expect(usuario.nome).toBe('Diego Sousa')
    expect(usuario.senha).toBe('654321')
})

test('Deve comparar as senhas corretamente', () => {
    const bcrypt = new CriptografarBcrypt()
    const senhaCrypto = bcrypt.criptografar('123456')   
    
    expect(bcrypt.comparar('123456', senhaCrypto)).toBe(true)
})

test('Deve cadastrar o usuário real no banco de dados', async () => {
    const banco = new UserCollectionDB()
    const criptografar = new CriptografarSenhaImpl()
    const useCase = new RegisterUser(banco, criptografar)
    const emailUnico = `diego+${Date.now()}@gmail.com`
    
    const usuario: User = await useCase.executar('Diego Sousa', emailUnico, "123456")
    expect(usuario).toHaveProperty('id')
    expect(usuario.nome).toBe('Diego Sousa')
    expect(usuario.senha).toBe('654321')
})