import type { Request, Response, NextFunction } from "express";
import type CollectionUserProvider from "../core/user/CollectionUserProvider";
import type TokenProvider from "../core/user/TokenProvider";
import type User from "../core/user/User";

export default function UserMiddleware(
    collection: CollectionUserProvider,
    tokenProvider: TokenProvider
) {
    return async (req: Request, res: Response, next: NextFunction) => {
        const authError = () => res.status(403).send('Invalid token')
        try {
            const token = req.headers.authorization?.replace('Bearer ', '')

            if (!token) {
                authError()
                return
            }

            const userToken = tokenProvider.validar(token!) as Partial<User>
            if (!userToken?.email || !userToken?.id) {
                authError()
                return
            }

            const user = await collection.findByEmail(userToken.email)

            if (!user || user.id !== userToken.id) {
                authError()
                return
            }

            (req as any).user = user
            next()
        } catch (e) {
            authError()
        }
    }
}