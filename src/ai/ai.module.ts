import { Module } from '@nestjs/common';
import { AiController } from './ai.controller';
import { MqttService } from 'src/mqtt/mqtt.service';

@Module({
  controllers: [AiController],
  providers:[MqttService]
})
export class AiModule {}
