import { Module } from '@nestjs/common';
import { ProcessController } from './process.controller';
import { ProcessService } from './process.service';
import { MongooseModule } from '@nestjs/mongoose';
import { processSchema } from './schemas/process.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Process', schema: processSchema }]),
  ],
  controllers: [ProcessController],
  providers: [ProcessService],
})
export class ProcessModule {}
