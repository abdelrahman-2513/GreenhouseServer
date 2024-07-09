import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RobotDocument } from './schemas/robot.schema';
import { CreateRobotDTO } from './dtos/createRobot.dto';
import { IRobot } from './interfaces/robot.interface';
import { UpdateRobotDTO } from './dtos/updateRobot.dto';
import { GreenhouseService } from 'greenhouse/greenhouse.service';
import { ERobotStatus } from 'auth/enum';
import { IRobotAI } from 'auth/interfaces';
import { AIRobot } from 'auth/types';

@Injectable()
export class RobotService {
  constructor(
    @InjectModel('Robot') private robotModel: Model<RobotDocument>,
    private greenhouseSVC: GreenhouseService,
  ) {}
  // Create new robot Function
  public async createRobot(robotData: CreateRobotDTO): Promise<IRobot> {
    const newRobot = await this.robotModel.create(robotData);
    const robot: IRobotAI = {
      robotId: newRobot._id.toString(),
      greenhouseId: robotData.greenhouse.toString(),
    };
    const robotAi: AIRobot = new AIRobot(robot);
    console.log(robotAi);
    https: await this.greenhouseSVC.addInStats(
      robotData.greenhouse.toString(),
      'robots',
    );
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // Specify content type as JSON
      },
      body: JSON.stringify(robotAi), // Convert data to JSON string
    };

    // Make the POST request
    fetch(
      'https://create-robot-4aca26e5c03c.herokuapp.com/Create_robot',
      options,
    )
      .then((response) => {
        console.log(response);
        if (response.ok) {
          return response.json(); // Parse the JSON in the response
        }
        throw new Error('Network response was not ok.');
      })
      .then((data) => {
        console.log(data); // Handle the response data
        console.log(robotAi);
      });
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

  //update robot after getting acknoledge from embedded

  async updateRobotStatus(robotId: string): Promise<IRobot> {
    try {
      if (!robotId) throw new Error('No robotID!');
      const regex = new RegExp(robotId);

      const allRobots = await this.robotModel.find();
      console.log(regex);
      const robotsToUpdate = allRobots.filter(
        (robot) => robot._id.toString().indexOf(robotId) !== -1,
      );

      // Update each found robot individually
      const updatedRobots = [];
      for (const robot of robotsToUpdate) {
        const updatedRobot = await this.robotModel.findOneAndUpdate(
          { _id: robot._id },
          { $set: { status: ERobotStatus.FREE } },
          { returnNewDocument: true },
        );
        updatedRobots.push(updatedRobot);
      }

      return updatedRobots[0];
    } catch (err) {
      console.log(err);
    }
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
