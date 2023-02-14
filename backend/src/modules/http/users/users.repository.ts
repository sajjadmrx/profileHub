import {Injectable} from "@nestjs/common";
import {PrismaService} from "src/modules/prisma/prisma.service";
import {
    ProfileCreateInput,
    ProfileUpdateInput,
    User,
    UserCreateInput,
    UserId
} from "src/shared/interfaces/user.interface";


@Injectable()
export class UsersRepository {
    constructor(private db: PrismaService) {
    }

    async findOneById(userId: UserId): Promise<User | null> {
        return this.db.user.findUnique({
            where: {
                id: userId
            }
        })
    }

    async findOneByEmail(email: string): Promise<User | null> {
        const users = await this.db.user.findMany({
            where: {
                email
            }
        })
        return users[0]
    }


    async create(input: UserCreateInput): Promise<User> {
        return this.db.user.create({data: input})
    }

    async createProfile(userId: UserId) {
        return this.db.profile.create({data: {userId}})
    }

    async getMainProfile(userId: UserId) {
        return this.db.profile.findUnique({
            where: {
                userId
            },
            select: {
                avatars: true,
                userId: true,
                banner: true,
                user: {select: {username: true}}
            }
        })
    }

    async findOneProfile(userId: UserId) {
        return this.db.profile.findUnique({
            where: {
                userId
            }
        })
    }

    async updateProfile(userId: UserId, date: ProfileUpdateInput) {
        return this.db.profile.update({
            where: {userId},
            data: date
        })
    }
}
