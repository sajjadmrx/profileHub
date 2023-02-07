import {JwtService} from "@nestjs/jwt";
import {INestApplication} from "@nestjs/common";

export async function createJwtFixture(app: INestApplication, userId: number): Promise<string> {
    const jwtService = app.get<JwtService>(JwtService)
    return jwtService.signAsync({id: userId},
        {
            expiresIn: "20d",
        })
}
