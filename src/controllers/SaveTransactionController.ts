import { type Express, type Request, type Response } from "express";
import type SaveTransaction from "../core/transaction/SaveTransaction";
import type User from "../core/user/User";

export default class SaveTransactionController {
    constructor(
        private server: Express,
        private useCase: SaveTransaction,
        private middlewares: any[]
    ) { }

    execute() {
        this.server.post('/transaction', this.middlewares, async (req: Request, res: Response) => {
            const user = (req as any).user as User

            if (!user.id) {
                res.status(403).send('Invalid token')
                return
            }

            if (req.body.idUsuario && req.body.idUsuario !== user.id) {
                res.status(403).send('User mismatch')
                return
            }
            
            const transaction = {
                id: req.body.id,
                descricao: req.body.descricao,
                valor: req.body.valor,
                vencimento: new Date(req.body.vencimento),
                idUsuario: user.id,
            }

            try {
                const output = await this.useCase.execute(transaction)
                res.status(200).send(output)
            } catch (err: any) {
                res.status(403).send(err.message)
            }
        })
    }
}