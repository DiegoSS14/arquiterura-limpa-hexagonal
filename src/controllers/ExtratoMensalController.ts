import { type Express, type Request, type Response } from "express";
import type ExtratoMensal from "../core/transaction/ExtratoMensal";

export default class ExtratoMensalController {
    constructor(
        private server: Express,
        private useCase: ExtratoMensal,
        private middlewares: any[]
    ) { }

    execute() {
        this.server.get('/transaction/:year/:month', this.middlewares, async (req: Request, res: Response) => {
            try{
                const user = (req as any).user
                const year = Number(req.params.year)
                const month = Number(req.params.month)
    
                if(!year || !month) throw new Error('Path params not present') 
    
                const extrato = await this.useCase.execute({user, year, month})
                res.status(200).json(extrato)
            } catch(err: any) {
                res.status(400).send(err.message)
            }
        })
    }
}