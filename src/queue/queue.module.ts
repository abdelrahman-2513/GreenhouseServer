import { BullModule } from '@nestjs/bull';
import { Module, forwardRef } from '@nestjs/common';
import { QueueService } from './queue.service';
import { ProcessModule } from 'process/process.module';
import { ProcessConsumer } from './consumers/queue.consumer';

@Module({
  imports: [
    BullModule.registerQueue({ name: 'Navigation-queue' }),
    forwardRef(() => ProcessModule),
  ],
  providers: [QueueService, ProcessConsumer],
  exports: [QueueService, ProcessConsumer],
})
export class QueueModule {}
