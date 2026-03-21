import type Banco from "../app/ports/Banco"

export default class BancoImpl implements Banco{
    private static db: any = []

    inserir(item: any) {
        BancoImpl.db.push(item)
        return item
    }
}