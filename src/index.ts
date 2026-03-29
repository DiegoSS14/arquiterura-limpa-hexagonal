import env from 'dotenv'
env.config()

import express from "express";
import UserRegister from './core/user/UserRegister';
import UserCollectionDB from './adapters/db/UserCollectionDB';
import CriptografarBcrypt from './adapters/auth/BcryptAdapter';
import UserRegisterController from './controllers/UserRegisterController';
import UserLoginController from './controllers/UserLoginController';
import UserLogin from './core/user/UserLogin';
import JwtTokenImpl from './adapters/auth/JwtAdapter';
import SaveTransaction from './core/transaction/SaveTransaction';
import SaveTransactionController from './controllers/SaveTransactionController';
import UserMiddleware from './controllers/UserMiddleware';
import CollectionTransaction from './adapters/db/CollectionTransaction';

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const port = process.env.PORT ?? 3001

app.listen(port, () => {
    console.log(`🔥 Application is running on port ${port}`)
})

// ---------------------------------- Rotas públicas

const userCollection = new UserCollectionDB()
const encrypt  = new CriptografarBcrypt()
const secret = process.env.JWT_SECRET || 'your secret'
const tokenImpl = new JwtTokenImpl(secret)
const userRegister = new UserRegister(userCollection, encrypt)
const userLogin = new UserLogin(userCollection, tokenImpl, encrypt)

const userRegisterController = new UserRegisterController(app, userRegister)
userRegisterController.execute()

const userLoginController = new UserLoginController(app, userLogin)
userLoginController.execute()

// ---------------------------------- Rotas autenticadas

const transactionCollection = new CollectionTransaction()

const userMiddleware = UserMiddleware(userCollection, tokenImpl)
const saveTransaction = new SaveTransaction(transactionCollection)
const saveTransactionController = new SaveTransactionController(app, saveTransaction, [userMiddleware])
saveTransactionController.execute()