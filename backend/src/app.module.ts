import {DynamicModule, Module} from '@nestjs/common';
import {LoggerModule} from "./modules/logger/logger.module";
import {ConsoleLogger} from "./modules/logger/messageLoggers/console.logger";
import {ConfigModule} from "@nestjs/config";
import Config from "./config";
import {HttpModule} from "./modules/http/http.module";
import {PrismaModule} from "./modules/prisma/prisma.module";

const utilModules: DynamicModule[] = [
    LoggerModule.register(ConsoleLogger),
    ConfigModule.forRoot({
        isGlobal: true,
        load: [Config]
    })
]

@Module({
    imports: [...utilModules, HttpModule, PrismaModule],
    controllers: [],
    providers: [],
})
export class AppModule {
}
