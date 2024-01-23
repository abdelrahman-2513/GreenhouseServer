import { Module, forwardRef } from '@nestjs/common';
import { ProcessController } from './process.controller';
import { ProcessService } from './process.service';
import { MongooseModule } from '@nestjs/mongoose';
import { processSchema } from './schemas/process.schema';
import { QueueModule } from 'queue/queue.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Process', schema: processSchema }]),

    forwardRef(() => QueueModule),
  ],
  controllers: [ProcessController],
  providers: [ProcessService],
  exports: [ProcessService],
})
export class ProcessModule {}
