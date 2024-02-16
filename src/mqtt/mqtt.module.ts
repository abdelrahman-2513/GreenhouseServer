import { Module } from '@nestjs/common';
import { MqttService } from './mqtt.service';
import { MqttController } from './mqtt.controller';
import { RobotModule } from 'robot/robot.module';
import { ProcessModule } from 'process/process.module';

@Module({
  imports: [RobotModule, ProcessModule],
  providers: [MqttService],
  controllers: [MqttController],
  // exports:[MqttService]
})
export class MqttModule {}
