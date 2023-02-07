import {ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus} from "@nestjs/common";

import {} from "express";
import {Logger} from "src/modules/logger/logger.service";
import {HttpAdapterHost} from "@nestjs/core"
import {getResponseMessage} from "../constants/messages.constant";

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
    constructor(private logger: Logger, private readonly httpAdapterHost: HttpAdapterHost) {
    }

    catch(exception: HttpException, host: ArgumentsHost): any {

        const {httpAdapter} = this.httpAdapterHost;

        const ctx = host.switchToHttp();

        const httpStatus =
            exception instanceof HttpException
                ? exception.getStatus()
                : HttpStatus.INTERNAL_SERVER_ERROR;

        const message: string = getResponseMessage(exception.message as any) || getResponseMessage("SERVER_ERROR");

        const responseBody = {
            statusCode: httpStatus,
            message
        };

        httpAdapter
            .reply(ctx.getResponse(), responseBody, httpStatus);

        const hasResponseMessage: string | null = getResponseMessage(
            exception.message as any
        );
        if (!hasResponseMessage) {
            this.logger.error(exception.message, exception.stack);
        }
    }
}
