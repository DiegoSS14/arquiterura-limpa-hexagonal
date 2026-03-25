import env from 'dotenv'
env.config()

import express from "express";
import UserRegister from './core/user/UserRegister';
import UserCollectionDB from './adapters/db/knex/UserCollectionDB';
import CriptografarBcrypt from './adapters/auth/CriptografarBcrypt';
import UserRegisterController from './controllers/UserRegisterController';
import UserLoginController from './controllers/UserLoginController';
import UserLogin from './core/user/UserLogin';

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const port = process.env.PORT ?? 3001

app.listen(port, () => {
    console.log(`🔥 Application is running on port ${port}`)
})

// ---------------------------------- Rotas públicas

const collection = new UserCollectionDB()
const encrypt  = new CriptografarBcrypt()
const userRegister = new UserRegister(collection, encrypt)
const userLogin = new UserLogin(collection, encrypt)

const userRegisterController = new UserRegisterController(app, userRegister)
userRegisterController.execute()

const userLoginController = new UserLoginController(app, userLogin)
userLoginController.execute()

// ---------------------------------- Rotas autenticadas