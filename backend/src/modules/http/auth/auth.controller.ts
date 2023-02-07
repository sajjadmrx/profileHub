import {Body, Controller, Post, UseFilters, UseInterceptors} from "@nestjs/common";

import {ApiOperation, ApiTags} from "@nestjs/swagger";
import {AuthService} from "./auth.service";
import {AuthGoogleDto} from "./dtos/authGoogle.dto";
import {ResponseInterceptor} from "src/shared/interceptors/response.interceptor";
import {HttpExceptionFilter} from "src/shared/filters/http-exception.filter";


@ApiTags("Auth")
@UseInterceptors(ResponseInterceptor)
@UseFilters(HttpExceptionFilter)
@Controller("auth")
export class AuthController {
    constructor(private readonly authService: AuthService) {
    }

    @ApiOperation({summary: "login with google"})
    @Post("google")
    async googleLogin(@Body() body: AuthGoogleDto) {
        return this.authService.googleHandler(body.token);
    }
}
