import {Controller, UseFilters, UseInterceptors} from "@nestjs/common";
import {ApiTags} from "@nestjs/swagger";
import {ResponseInterceptor} from "../../../../shared/interceptors/response.interceptor";
import {HttpExceptionFilter} from "../../../../shared/filters/http-exception.filter";


@ApiTags("Users")
@UseInterceptors(ResponseInterceptor)
@UseFilters(HttpExceptionFilter)
@Controller("/users")
export class UsersController {
}
