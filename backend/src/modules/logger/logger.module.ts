import { DynamicModule, Global, Module } from "@nestjs/common";
import { Logger } from "./logger.service";
import { DependencyKey } from "./constants/dependencyKey.constant";
import { ConsoleLogger } from "./messageLoggers/console.logger";


@Global()
@Module({
  exports: [Logger],
  providers: [Logger]
})
export class LoggerModule {
  static register(messageLogger: any): DynamicModule {
    return {
      module: LoggerModule,
      providers: [
        {
          provide: DependencyKey.MESSAGE_LOGGER,
          useClass: messageLogger as any
        },
        Logger,
        ConsoleLogger
      ]
    };
  }
}
