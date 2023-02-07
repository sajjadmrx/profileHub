import {Injectable, UnauthorizedException} from '@nestjs/common';
import {PassportStrategy} from '@nestjs/passport';
import {ExtractJwt, Strategy} from 'passport-jwt';
import {UsersRepository} from '../../users/users.repository';
import {ConfigService} from "@nestjs/config";
import {Configs} from "../../../../config";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private usersRepository: UsersRepository, private configService: ConfigService<Configs>) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get("JWT_SECRET"),
        });
    }

    async validate(payload: any) {
        try {
            if (!payload.id) throw new UnauthorizedException();
            //
            // const user = await this.usersRepository.findById(Number(payload.id), {});
            // if (!user) throw new UnauthorizedException();
            //
            // return user;
        } catch (e) {
            throw e;
        }
    }
}
