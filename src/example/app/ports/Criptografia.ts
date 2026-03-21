export default interface Criptografia {
    criptografar(senha:string):string
    comparar(senha:string, senhaCripto: string):boolean
}