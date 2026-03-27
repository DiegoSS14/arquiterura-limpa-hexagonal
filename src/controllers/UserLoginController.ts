import { type Express } from "express";

export default class UserLoginController {
    constructor(
        private server: Express,
        private useCase: any
    ) { }

    execute() {
        this.server.post('/login', async (req, res) => {
            try {
                const output = await this.useCase.execute({
                    email: req.body.email,
                    senha: req.body.senha
                })
                res.status(200).send({user: output.user, token: output.token})
            } catch (err: any) {
                res.status(403).send(err.message)
            }
        })
    }
}