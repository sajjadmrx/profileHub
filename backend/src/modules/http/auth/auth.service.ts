import {Injectable, NotFoundException} from "@nestjs/common";
import {JwtService} from "@nestjs/jwt";
import {UsersRepository} from "../users/users.repository";
import {GoogleAuth} from "./interfaces/googleAuth.interface";
import {User} from "src/shared/interfaces/user.interface";
import {SessionRepository} from "./session.repository";
import {v4 as uuidv4} from 'uuid';


@Injectable()
export class AuthService {
    constructor(
        private usersRepo: UsersRepository,
        private sessionRepo: SessionRepository,
        private jwtService: JwtService,
    ) {
    }

    async googleHandler(token: string): Promise<{ token: string, refresh: string }> {
        const data: GoogleAuth = this.jwtService.decode(token) as GoogleAuth;
        let user: User | null = await this.usersRepo.findOneByEmail(
            data.email,
        );
        if (!user) {
            const username = data.email.split("@")[0]
            user = await this.usersRepo.create({
                email: data.email,
                username,
            });
            await this.usersRepo.createProfile({
                userId: user.id
            })
        }

        const payload = {
            id: user.id
        };

        const refreshToken: string = uuidv4()
        await this.sessionRepo.create({
            refresh: refreshToken,
            userId: user.id
        })

        const jwt: string = await this.jwtService.signAsync(payload);
        return {
            token: jwt,
            refresh: refreshToken
        }

    }


}
