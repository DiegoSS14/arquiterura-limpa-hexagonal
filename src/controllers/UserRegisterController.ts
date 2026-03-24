import { type Express } from "express";
import type UserRegister from "../core/user/UserRegister";

export default class UserRegisterController {
    constructor(
        private server: Express,
        private useCase: UserRegister
    ){}

    execute() {
        this.server.post('/' , async (req, res)=>{
            const user = req.body
            const createdUser = await this.useCase.executar(user.nome, user.email, user.senha)
            res.status(201).json(createdUser)
        })
    }
}