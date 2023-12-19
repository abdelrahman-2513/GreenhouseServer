import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RobotDocument } from './schemas/robot.schema';
import { CreateRobotDTO } from './dtos/createRobot.dto';
import { IRobot } from './interfaces/robot.interface';
import { UpdateRobotDTO } from './dtos/updateRobot.dto';
import { GreenhouseService } from 'greenhouse/greenhouse.service';
import { isArrayBufferView } from 'util/types';

@Injectable()
export class RobotService {
  constructor(
    @InjectModel('Robot') private robotModel: Model<RobotDocument>,
    private greenhouseSVC: GreenhouseService,
  ) {}
  // Create new robot Function
  public async createRobot(robotData: CreateRobotDTO): Promise<IRobot> {
    const newRobot = await this.robotModel.create(robotData);
    await this.greenhouseSVC.addInStats(
      robotData.greenhouse.toString(),
      'robots',
    );
    return newRobot;
  }
  //Read robot from DB
  public async findRobot(robot_id: string): Promise<IRobot> {
    const robot = await this.robotModel.findById(robot_id);
    return robot;
  }

  // Read all robots
  public async findAllRobots(): Promise<IRobot[]> {
    const robots = await this.robotModel.find({});
    return robots;
  }
  // Update robot Data
  public async updateRobot(
    robot_id: string,
    robotData: UpdateRobotDTO,
  ): Promise<IRobot> {
    const updatedRobot = await this.robotModel.findByIdAndUpdate(
      robot_id,
      robotData,
    );
    return updatedRobot;
  }
  // Delete Robot
  public async deleteRobot(robot_id: string) {
    const robot = await this.robotModel.findById(robot_id);
    await this.greenhouseSVC.deleteInStats(
      robot.greenhouse.toString(),
      'robots',
    );
    await this.robotModel.findByIdAndDelete(robot_id);
  }

  //get robot id by name for embedded
  public async getRobotId(name: string) {
    const robot = await this.robotModel.findOne({ name: name });
    return robot;
  }

  public gettingUniqueId(id: string): string {
    const substringLength = 6;
    const startIndex = Math.max(
      0,
      Math.floor((id.length - substringLength) / 2),
    );
    const extractedSubstring = id.substring(
      startIndex,
      startIndex + substringLength,
    );
    return extractedSubstring;
  }
}
