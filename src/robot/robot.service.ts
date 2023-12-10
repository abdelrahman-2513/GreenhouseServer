import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RobotDocument } from './schemas/robot.schema';
import { CreateRobotDTO } from './dtos/createRobot.dto';
import { IRobot } from './interfaces/robot.interface';
import { UpdateRobotDTO } from './dtos/updateRobot.dto';

@Injectable()
export class RobotService {
  constructor(@InjectModel('Robot') private robotModel: Model<RobotDocument>) {}
  // Create new robot Function
  public async createRobot(robotData: CreateRobotDTO): Promise<IRobot> {
    const newRobot = await this.robotModel.create(robotData);

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
    await this.robotModel.findByIdAndDelete(robot_id);
  }
}
