import { BullModule } from '@nestjs/bull';
import { Module, forwardRef } from '@nestjs/common';
import { QueueService } from './queue.service';
import { ProcessModule } from 'process/process.module';

@Module({
  imports: [
    BullModule.forRoot({
      redis: {
        host:
          process.env.REDIS_HOST ||
          'redis-14163.c322.us-east-1-2.ec2.cloud.redislabs.com',
        port: 14163,
        password: process.env.REDIS_PASSWORD,
      },
    }),
    BullModule.registerQueue({ name: 'Navigation-queue' }),
    forwardRef(() => ProcessModule),
  ],
  providers: [QueueService],
  exports: [QueueService],
})
export class QueueModule {}
