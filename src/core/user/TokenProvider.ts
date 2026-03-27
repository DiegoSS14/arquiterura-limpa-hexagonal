export default interface TokenProvider {
    generate(payload: object | string): string
    validar(token: string): string | object
}