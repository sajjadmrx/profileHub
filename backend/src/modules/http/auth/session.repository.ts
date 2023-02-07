import {Injectable} from "@nestjs/common";
import {PrismaService} from "../../prisma/prisma.service";
import {SessionCreateInput} from "./interfaces/session.interface";

@Injectable()
export class SessionRepository {
    constructor(private db: PrismaService) {
    }

    async create(input: SessionCreateInput) {
        return this.db.sessions.create({
            data: input
        })
    }
}
