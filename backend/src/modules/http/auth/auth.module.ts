import {Module} from "@nestjs/common";
import {UserModule} from '../users/users.module';

import {JwtModule} from "@nestjs/jwt";
import {JwtStrategy} from "./strategies/jwt.strategy";
import {SessionRepository} from "./session.repository";
import {AuthService} from "./auth.service";
import {AuthController} from "./auth.controller";


const ImportsAndExports = [JwtModule.register({signOptions: {expiresIn: "10d"}})]

@Module({
    imports: [
        UserModule,
        ...ImportsAndExports
    ],
    controllers: [AuthController],
    providers: [JwtStrategy, SessionRepository, AuthService],
    exports: [...ImportsAndExports]
})
export class AuthModule {
}
