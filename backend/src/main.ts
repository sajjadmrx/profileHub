import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {Logger} from "./modules/logger/logger.service";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = app.get<Logger>(Logger);

  await app.listen(3000);
  logger.log(`Server Running At ${3000}`)
}
bootstrap();
