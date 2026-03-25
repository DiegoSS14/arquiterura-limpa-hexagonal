import { type Express } from "express";

export default class UserLoginController {
    constructor(
        private server: Express,
        private useCase: any
    ) { }

    execute() {
        this.server.post('/login', async (req, res) => {
            try {
                const output = await this.useCase.execute(
                    req.body.email, 
                    req.body.senha)
                res.status(200).send({
                    id: output.user.id,
                    nome: output.user.nome,
                    email: output.user.email,
                })
            } catch (err: any) {
                res.status(403).send(err.message)
            }
        })
    }
}