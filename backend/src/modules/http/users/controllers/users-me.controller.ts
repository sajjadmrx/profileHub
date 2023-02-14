import {Body, Controller, Get, Patch, UseFilters, UseGuards, UseInterceptors} from "@nestjs/common";
import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";
import {ResponseInterceptor} from "src/shared/interceptors/response.interceptor";
import {HttpExceptionFilter} from "src/shared/filters/http-exception.filter";
import {authGuard} from "src/shared/guards/auth.guard";
import {UsersMeService} from "../services/users-me.service";
import {getUser} from "src/shared/decorators/user.decorator";
import userDataExample from "../examples_docs/userData.example";
import {ApiRes} from "src/shared/decorators/apiRes.decorator";
import {UpdateProfileDto} from "../dtos/update-profile.dto";


@ApiTags("Users(Me)")
@ApiBearerAuth()
@UseInterceptors(ResponseInterceptor)
@UseFilters(HttpExceptionFilter)
@UseGuards(authGuard())
@Controller("/users/@me")
export class UsersMeController {

    constructor(private usersMeService: UsersMeService) {
    }

    @ApiRes("get user data", userDataExample)
    @Get("/")
    getMe(@getUser("id") userId) {
        return this.usersMeService.getUserData(userId)
    }

    @ApiRes("get current user profile", null)
    @Get("/profile")
    getProfile(@getUser("id") userId) {
        return this.usersMeService.getProfile(userId)
    }

    @ApiRes("update user profile", null)
    @Patch("/profile")
    updateProfile(@Body() input: UpdateProfileDto, @getUser("id") userId) {
        return this.usersMeService.updateProfile(input, userId)
    }
}
