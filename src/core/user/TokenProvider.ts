export default interface TokenProvider {
    generate(email: string, senha: string): string
}