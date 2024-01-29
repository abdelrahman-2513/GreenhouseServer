import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';
import { QueueService } from 'queue/queue.service';
import { MqttSendProcessor } from 'queue/consumers/mqtt.queue.consumer';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  app.useWebSocketAdapter(new IoAdapter(app));
  const queueProcessing = app.get(QueueService);
  // queueProcessing2.handleMqttJob()
  await app.listen(process.env.PORT || 4000);
}
bootstrap();
