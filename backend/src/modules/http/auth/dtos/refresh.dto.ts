import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty, IsString} from "class-validator";

export class RefreshTokenDto {
    @IsNotEmpty({message: "REFRESH_TOKEN_IS_EMPTY"})
    @IsString({message: "REFRESH_TOKEN_MUST_STRING"})
    @ApiProperty()
    refresh: string
}
