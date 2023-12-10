import { Module } from '@nestjs/common';
import { RobotService } from './robot.service';
import { RobotController } from './robot.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { robotSchema } from './schemas/robot.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Robot', schema: robotSchema }]),
  ],
  providers: [RobotService],
  controllers: [RobotController],
})
export class RobotModule {}
