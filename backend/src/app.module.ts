import {DynamicModule, Module} from '@nestjs/common';
import {LoggerModule} from "./modules/logger/logger.module";
import {ConsoleLogger} from "./modules/logger/messageLoggers/console.logger";
import {ConfigModule} from "@nestjs/config";
import Config from "./config";

const utilModules: DynamicModule[] = [
    LoggerModule.register(ConsoleLogger),
    ConfigModule.forRoot({
        isGlobal: true,
        load: [Config]
    })
]

@Module({
    imports: [...utilModules],
    controllers: [],
    providers: [],
})
export class AppModule {
}
