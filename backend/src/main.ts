import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

export async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  const server = await app.listen(process.env.PORT || 3000);
  return { app, server };
}
//! Comment this while testing!
/* bootstrap();
 */
