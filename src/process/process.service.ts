import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model, Types } from 'mongoose';
import { ProcessDocument } from './schemas/process.schema';
import { CreateProcessDTO } from './dtos/create.process.dto';
import { IProcess } from './interface/process.interface';
import { UpdateProcessDTO } from './dtos/update.process.dto';
import { QueueService } from 'queue/queue.service';
import { EStatus } from 'auth/enum';

@Injectable()
export class ProcessService {
  constructor(
    @InjectModel('Process') private processModel: Model<ProcessDocument>,
    @Inject(forwardRef(() => QueueService)) private QueueSVC: QueueService,
  ) {}

  // Create New Process
  public async createProcess(process: CreateProcessDTO): Promise<IProcess> {
    const newProcess = await this.processModel.create(process);
    const queueProcess = {
      id: newProcess._id,
      feild: process.feild,
      type: process.currentPhase,
      robot_id: process.robot,
    };
    await this.QueueSVC.addToQueue(queueProcess);
    return newProcess;
  }
  //Read process from DB
  public async findprocess(process_id: string): Promise<IProcess> {
    const newProcessId = new Types.ObjectId(process_id);
    const process = await this.processModel.findById(newProcessId);
    return process;
  }

  // Read all processs
  public async findAllprocesss(): Promise<IProcess[]> {
    const processs = await this.processModel.find({});
    return processs;
  }
  // Update process Data
  public async updateprocess(
    process_id: string,
    processData: UpdateProcessDTO,
  ): Promise<IProcess> {
    const updatedprocess = await this.processModel.findByIdAndUpdate(
      process_id,
      processData,
    );
    return updatedprocess;
  }
  // Delete process
  public async deleteprocess(process_id: string) {
    await this.processModel.findByIdAndDelete(process_id);
  }
  // Delete process
  public async deleteAllprocess() {
    await this.processModel.deleteMany();
  }

  //Find processes done by user
  public async findUserProcesses(user_id: string): Promise<IProcess[]> {
    const userProcesses = await this.processModel
      .find({ creator: user_id })
      .populate('creator')
      .populate('robot');
    return userProcesses;
  }

  // Find processes done by robot
  public async findRobotProcesses(
    robot_id: string,
    page: number = 1,
    pageSize: number = 10,
  ): Promise<IProcess[]> {
    const robotProcesses = await this.processModel
      .find({
        robot: robot_id,
      })
      .populate('robot')
      .populate('creator')
      .populate('greenhouse')
      .skip((page - 1) * pageSize)
      .limit(pageSize);
    return robotProcesses;
  }

  // Find processes for greenhouse
  public async findGreenhouseProcesses(
    greenhouse_id: string,
    page: number = 1,
    pageSize: number = 10,
  ): Promise<IProcess[]> {
    const greenhouseProcesses = await this.processModel
      .find({
        greenhouse: greenhouse_id,
      })
      .populate('robot')
      .populate('creator')
      .skip((page - 1) * pageSize)
      .limit(pageSize);
    return greenhouseProcesses;
  }
  //  Find processes For Greenhouse with stats
  public async findProcessStats(greenhouse_id: string) {
    const newgreenhouse_id = new mongoose.Types.ObjectId(greenhouse_id);
    console.log(newgreenhouse_id);
    const proc = await this.processModel.find({ greenhouse: greenhouse_id });
    console.log(proc);
    let greenhouseProcesses = await this.processModel
      .aggregate([
        {
          $match: {
            greenhouse: newgreenhouse_id,
          },
        },
        {
          $lookup: {
            from: 'users', // Replace with the actual name of the 'creators' collection
            localField: 'creator', // Assuming '_id' is the field in 'processes' that matches 'creator' in 'creators'
            foreignField: '_id',
            as: 'user',
          },
        },
        {
          $unwind: '$user',
        },

        {
          $group: {
            _id: '$user._id',
            creator: { $first: '$user' },
            processes: {
              $push: {
                _id: '$_id',
                status: '$status',
              },
            },
            userProcesses: { $sum: 1 },
          },
        },

        {
          $project: {
            _id: 0,
            creator: 1,
            processes: 1,
            userProcesses: 1,
          },
        },
        {
          $group: {
            _id: null,
            creators: { $push: '$$ROOT' },
            totalProcesses: { $sum: '$userProcesses' },
          },
        },
        {
          $project: {
            _id: 0,
            creators: 1,
            totalProcesses: 1,
          },
        },
      ])
      .exec();

    if (greenhouseProcesses.length > 0)
      greenhouseProcesses = greenhouseProcesses[0];

    return greenhouseProcesses;
  }

  // get recent process for each field
  async getRecentProcessesByField(house_id: string): Promise<IProcess[]> {
    const newHouseID = new Types.ObjectId(house_id);
    const recentProcessesByField = await this.processModel.aggregate([
      {
        $match: { greenhouse: newHouseID },
      },
      {
        $sort: { createdAt: -1 }, // Sort by createdAt field in descending order
      },
      {
        $group: {
          _id: '$feild', // Group by field
          latestProcess: { $first: '$$ROOT' }, // Get the first document (latest) in each group
        },
      },
      {
        $replaceRoot: { newRoot: '$latestProcess' }, // Replace the root with the latest process in each group
      },
      {
        $project: {
          _id: 0,
          feild: 1,
          currentPhase: 1,
          status: 1,
          createdAt: 1,
        },
      },
    ]);

    return recentProcessesByField;
  }
  async updateProcessStatus(robot_id: string): Promise<IProcess> {
    try {
      if (!robot_id) throw new Error('No robotID!');
      const regex = new RegExp(robot_id);
      // const robot = await this.processModel.findOneAndUpdate(
      //   { robot: { $regex: regex.toString() } },
      //   { $set: { status: EStatus.COMPLETED } },
      //   { returnNewDocument: true },
      // );
      // return robot;
      console.log(regex);
      const allRobots = await this.processModel.find();
      console.log(regex);
      const robotsToUpdate = allRobots.filter(
        (robot) => robot.robot.toString().indexOf(robot_id) !== -1,
      );

      // Update each found robot individually
      const updatedRobots = [];
      for (const robot of robotsToUpdate) {
        const updatedRobot = await this.processModel.findOneAndUpdate(
          { robot: robot.robot },
          { $set: { status: EStatus.COMPLETED } },
          { returnNewDocument: true },
        );
        updatedRobots.push(updatedRobot);
      }

      return updatedRobots[0];
    } catch (err) {
      console.log(err);
    }
  }
}
