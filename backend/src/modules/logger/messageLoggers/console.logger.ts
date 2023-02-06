
import { Injectable } from "@nestjs/common";
import {MessageLogger} from "../interfaces/messageLogger.interface";


@Injectable()
export class ConsoleLogger implements MessageLogger {
  constructor() {
  }

  async error(message: string, stack?: string): Promise<void> {
    console.log(message,stack)
  }

  async log(message: object | string, options?: any): Promise<void> {
    console.log(message)
  }
}
