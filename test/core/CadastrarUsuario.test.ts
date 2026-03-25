import CriptografarBcrypt from '../../src/adapters/auth/CriptografarBcrypt'
import CriptografarSenhaImpl from '../../src/adapters/auth/CriptografarSenhaImpl'
import UserInMemory from '../../src/adapters/db/UserInMemory'
import UserCollectionDB from '../../src/adapters/db/knex/UserCollectionDB'
import User from '../../src/core/user/User'
import RegisterUser from '../../src/core/user/UserRegister'
import Id from '../../src/core/shared/Id'

test('Deve cadastrar o usuário', async () => {
    const banco = new UserInMemory()
    const criptografar = new CriptografarSenhaImpl()
    const useCase = new RegisterUser(banco, criptografar)

    const usuario: User = await useCase.execute('Diego Sousa', 'diego@gmail.com', "123456")
    expect(usuario).toHaveProperty('id')
    expect(usuario.nome).toBe('Diego Sousa')
    expect(usuario.senha).toBe('654321')
})

test('Deve comparar as senhas corretamente', () => {
    const bcrypt = new CriptografarBcrypt()
    const senhaCrypto = bcrypt.criptografar('123456')

    expect(bcrypt.comparar('123456', senhaCrypto)).toBe(true)
})

test.skip('Deve cadastrar o usuário real no banco de dados', async () => {
    const banco = new UserCollectionDB()
    const criptografar = new CriptografarSenhaImpl()
    const useCase = new RegisterUser(banco, criptografar)
    
    const emailUnico = `diego+${Date.now()}@gmail.com`

    const usuario: User = await useCase.execute('Diego Sousa', emailUnico, "123456")
    expect(usuario).toHaveProperty('id')
    expect(usuario.nome).toBe('Diego Sousa')
    expect(usuario.senha).toBe('654321')
})

test.skip('Deve receber recusa do banco ao inserir e-mail duplicado', async () => {
    const banco = new UserCollectionDB()
    const email = `diego+duplicado-${Date.now()}@gmail.com`

    await banco.inserir({
        id: Id.gerar(),
        nome: 'Diego Sousa',
        email,
        senha: '123456'
    })

    await expect(
        banco.inserir({
            id: Id.gerar(),
            nome: 'Diego Sousa 2',
            email,
            senha: '654321'
        })
    ).rejects.toMatchObject({ code: '23505' })
})