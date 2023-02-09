import {Controller, Get, UseFilters, UseGuards, UseInterceptors} from "@nestjs/common";
import {ApiBearerAuth, ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {ResponseInterceptor} from "src/shared/interceptors/response.interceptor";
import {HttpExceptionFilter} from "src/shared/filters/http-exception.filter";
import {authGuard} from "src/shared/guards/auth.guard";
import {UsersMeService} from "../services/users-me.service";
import {getUser} from "src/shared/decorators/user.decorator";
import mainProfileExample from "../examples_docs/mainProfile.example";
import {ApiRes} from "../../../../shared/decorators/apiRes.decorator";


@ApiTags("Users(Me)")
@ApiBearerAuth()
@UseInterceptors(ResponseInterceptor)
@UseFilters(HttpExceptionFilter)
@UseGuards(authGuard())
@Controller("/users/@me")
export class UsersMeController {

    constructor(private usersMeService: UsersMeService) {
    }

    @ApiRes("get main profile", mainProfileExample)
    @Get("/")
    getMe(@getUser("id") userId) {
        return this.usersMeService.getMainProfile(userId)
    }
}
