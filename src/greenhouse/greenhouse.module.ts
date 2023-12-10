import { Module } from '@nestjs/common';
import { GreenhouseService } from './greenhouse.service';
import { GreenhouseController } from './greenhouse.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { greenhouseSchema } from './schemas/greenhouse.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Greenhouse', schema: greenhouseSchema },
    ]),
  ],
  providers: [GreenhouseService],
  controllers: [GreenhouseController],
  exports: [GreenhouseService],
})
export class GreenhouseModule {}
