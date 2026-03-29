import { type Express, type Request, type Response } from "express";
import type SaveTransaction from "../core/transaction/SaveTransaction";

export default class SaveTransactionController {
    constructor(
        private server: Express,
        private useCase: SaveTransaction, 
        private middlewares: any[]
    ) { }

    execute() {
        this.server.post('/transaction', this.middlewares, async (req: Request, res: Response) => {
            try {
                const output = await this.useCase.execute()
                res.status(200).send(output)
            } catch (err: any) {
                res.status(403).send(err.message)
            }
        })
    }
}