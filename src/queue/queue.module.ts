import { BullModule } from '@nestjs/bull';
import { Module, forwardRef } from '@nestjs/common';
import { QueueService } from './queue.service';
import { ProcessModule } from 'process/process.module';
import { ProcessConsumer } from './consumers/queue.consumer';
import { MqttService } from 'mqtt/mqtt.service';
import { MqttSendProcessor } from './consumers/mqtt.queue.consumer';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'Navigation-queue',

      // Adjust concurrency as needed
    }),
    BullModule.registerQueue({
      name: 'Mqtt-send-queue',
      /* other configuration options if needed */
    }),
    forwardRef(() => ProcessModule),
  ],
  providers: [QueueService, ProcessConsumer, MqttService, MqttSendProcessor],
  exports: [QueueService],
})
export class QueueModule {}
