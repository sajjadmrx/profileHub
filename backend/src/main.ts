import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {Logger} from "./modules/logger/logger.service";
import {ConfigService} from "@nestjs/config";
import {Configs} from "./config";

(async () => {
    const app = await NestFactory.create(AppModule);

    const logger = app.get<Logger>(Logger);

    const configService = app.get<ConfigService<Configs>>(ConfigService)
    const port: number = configService.get("PORT") || 3000


    await app.listen(port);

    logger.log(`Server Running At ${port}`)
})();

