import { Module } from '@nestjs/common';
import { IssueService } from './issue.service';
import { IssueController } from './issue.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { IssueSchema } from './schemas/issue.schema';
import { RobotModule } from 'robot/robot.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Issue', schema: IssueSchema }]),
    RobotModule,
  ],
  providers: [IssueService],
  controllers: [IssueController],
})
export class IssueModule {}
