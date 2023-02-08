import {Injectable} from "@nestjs/common";
import {PrismaService} from "../../prisma/prisma.service";
import {Session, SessionCreateInput} from "./interfaces/session.interface";

@Injectable()
export class SessionRepository {
    constructor(private db: PrismaService) {
    }

    async create(input: SessionCreateInput) {
        return this.db.sessions.create({
            data: input
        })
    }

    async findOneByRefreshToken(token: string): Promise<Session | null> {
        return this.db.sessions.findUnique({
            where: {refresh: token}
        })
    }

    async deleteOneByRefresh(token: string): Promise<boolean> {
        try {
            const session = await this.db.sessions.delete({
                where: {refresh: token}
            })
            return !!session;
        } catch (e) {
            throw e
        }
    }
}
