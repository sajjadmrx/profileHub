import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class AuthGoogleDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    token: string
}