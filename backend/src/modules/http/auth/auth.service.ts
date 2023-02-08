import {BadRequestException, Injectable, NotFoundException, UnauthorizedException} from "@nestjs/common";
import {JwtService} from "@nestjs/jwt";
import {UsersRepository} from "../users/users.repository";
import {GoogleAuth} from "./interfaces/googleAuth.interface";
import {User} from "src/shared/interfaces/user.interface";
import {SessionRepository} from "./session.repository";
import {v4 as uuidv4} from 'uuid';
import {ConfigService} from "@nestjs/config";
import {Configs} from "../../../config";
import {Session} from "./interfaces/session.interface";
import {getResponseMessage} from "../../../shared/constants/messages.constant";


@Injectable()
export class AuthService {
    constructor(
        private usersRepo: UsersRepository,
        private sessionRepo: SessionRepository,
        private jwtService: JwtService,
        private configService: ConfigService<Configs>
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
            await this.usersRepo.createProfile(user.id)
        }

        const payload = {
            id: user.id
        };

        const refreshToken: string = uuidv4()
        await this.sessionRepo.create({
            refresh: refreshToken,
            userId: user.id
        })

        const jwt: string = await this.jwtService.signAsync(payload, {
            secret: this.configService.get("JWT_SECRET")
        });
        return {
            token: jwt,
            refresh: refreshToken
        }

    }


    async refreshTokenHandler(currentToken: string): Promise<any> {
        const session: Session | null = await this.sessionRepo.findOneByRefreshToken(currentToken)
        if (!session)
            throw new BadRequestException(getResponseMessage("INVALID_REFRESH_TOKEN"))

        const jwt: string = await this.createJwt({
            id: session.userId
        })

        await this.sessionRepo.deleteOneByRefresh(currentToken)

        const refreshToken: string = uuidv4()
        await this.sessionRepo.create({
            refresh: refreshToken,
            userId: session.userId
        })

        return {
            token: jwt,
            refresh: refreshToken
        }
    }

    private async createJwt(payload: any): Promise<string> {
        return this.jwtService.signAsync(payload, {
            secret: this.configService.get("JWT_SECRET")
        });
    }
}
