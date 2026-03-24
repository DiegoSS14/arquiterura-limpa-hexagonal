import { randomUUID } from "node:crypto";

export default class{
    static gerar(): string {
        return randomUUID()
    }
}