import {IsDate, IsOptional, IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class UpdateProfileDto {
    @ApiProperty({example: "test"})
    @IsOptional()
    @IsString({message: "IS_STRING"})
    about: string

    @ApiProperty({example: new Date().toISOString()})
    @IsOptional()
    @IsString({message: "IS_STRING"})
    birthday: string

    @ApiProperty({example: "#fffff"})
    @IsOptional()
    @IsString()
    themeColor: string
}
