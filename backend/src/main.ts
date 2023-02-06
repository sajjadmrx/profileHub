import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {Logger} from "./modules/logger/logger.service";
import {ConfigService} from "@nestjs/config";
import {Configs} from "./config";
import {AppMode} from "./shared/constants/app-mode.constant";
import {DocumentConfig} from "./document.config";

(async () => {
    const app = await NestFactory.create(AppModule);

    const logger = app.get<Logger>(Logger);

    const configService = app.get<ConfigService<Configs>>(ConfigService)
    const port: number = configService.get("PORT") || 3000

    const appMode: AppMode = configService.get("NODE_ENV")
    if (appMode == AppMode.DEVELOPMENT) {
        const doc = new DocumentConfig(app);
        doc.setupSwagger(port, "/api-doc")
    }

    await app.listen(port);
    logger.log(`Server Running At ${port}`)
})();

