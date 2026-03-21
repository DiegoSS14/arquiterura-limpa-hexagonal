import BancoImpl from '../src/example/adapters/db/BancoImpl'
import CriptografarSenhaImpl from '../src/example/adapters/auth/CriptografarSenhaImpl'
import CadastrarUsuario from '../src/example/app/user/CadastrarUsuario'
import CriptografarBcrypt from '../src/example/adapters/auth/CriptografarBcrypt'

test('Deve cadastrar o usuário', () => {
    const banco = new BancoImpl()
    const criptografar = new CriptografarSenhaImpl()
    const useCase = new CadastrarUsuario(banco, criptografar)

    const usuario = useCase.executar('Diego Sousa', 'diego@gmail.com', "123456")
    expect(usuario).toHaveProperty('id')
    expect(usuario.nome).toBe('Diego Sousa')
    expect(usuario.senha).toBe('654321')
})

test('Deve comparar as senhas corretamente', () => {
    const banco = new BancoImpl()
    const bcrypt = new CriptografarBcrypt()
    const senhaCrypto = bcrypt.criptografar('123456')   

    expect(bcrypt.comparar('123456', senhaCrypto))
})