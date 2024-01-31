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
      limiter: {
        duration: 5000, // Adjust the duration as needed (e.g., 5000 milliseconds = 5 seconds)
        max: 10, // Adjust the concurrency limit as needed
        bounceBack: false,
      },
      // Adjust concurrency as needed
    }),
    // BullModule.registerQueue({
    //   name: 'my-queue',
    //   limiter: {
    //     max: 10,
    //     duration: 0,
    //   },
    // }),
    BullModule.registerQueue({
      name: 'Mqtt-send-queue',
      limiter: {
        duration: 500, // Adjust the duration as needed (e.g., 5000 milliseconds = 5 seconds)
        max: 10, // Adjust the concurrency limit as needed
        bounceBack: false,
      },

      /* other configuration options if needed */
    }),
    forwardRef(() => ProcessModule),
  ],
  providers: [QueueService, ProcessConsumer, MqttService, MqttSendProcessor],
  exports: [QueueService, BullModule],
})
export class QueueModule {}
