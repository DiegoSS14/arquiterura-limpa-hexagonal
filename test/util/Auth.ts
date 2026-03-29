import axios from "axios";
import users from '../data/users.ts';

const baseURL = process.env.BASE_URL

export async function getAuthorizationHeader() {
    const res: any = await axios.post(`${baseURL}/login`, {email: users.full.email, senha: users.full.senha})
    return({
        headers: {
            Authorization: `Bearer ${res.data.token}`
        }
    })
}