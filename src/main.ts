import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  app.useWebSocketAdapter(new IoAdapter(app));
  await app.listen(process.env.PORT || 4000);
}
bootstrap();
