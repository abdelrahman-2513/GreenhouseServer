import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';
import { QueueService } from 'queue/queue.service';
import { MqttService } from 'mqtt/mqtt.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  app.useWebSocketAdapter(new IoAdapter(app));
  const queueProcessing = app.get(QueueService);
  const mqttProcessing = app.get(MqttService);
  mqttProcessing.subscribe('18ciqt4398/robotAi');

  await app.listen(process.env.PORT || 4000);
}
bootstrap();
