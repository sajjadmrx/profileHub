import { Inject, Injectable, LoggerService } from "@nestjs/common";
import { DependencyKey } from "./constants/dependencyKey.constant";
import {MessageLogger} from "./interfaces/messageLogger.interface";

@Injectable()
export class Logger implements Pick<LoggerService,"log"|"error"> {
  constructor(
    @Inject(DependencyKey.MESSAGE_LOGGER)
    private messageLogger: MessageLogger
  ) {
  }

  log(message: any, options?: any) {
    this.messageLogger.log(message, options);
  }


  error(message: string, stack?: any): void {
    this.messageLogger.error(message, stack);
  }

}
