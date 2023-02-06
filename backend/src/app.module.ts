import { Module } from '@nestjs/common';
import {LoggerModule} from "./modules/logger/logger.module";
import {ConsoleLogger} from "./modules/logger/messageLoggers/console.logger";

@Module({
  imports: [LoggerModule.register(ConsoleLogger)],
  controllers: [],
  providers: [],
})
export class AppModule {}
