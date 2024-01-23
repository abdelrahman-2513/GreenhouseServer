import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { ProcessDocument } from './schemas/process.schema';
import { CreateProcessDTO } from './dtos/create.process.dto';
import { IProcess } from './interface/process.interface';
import { UpdateProcessDTO } from './dtos/update.process.dto';
import { QueueService } from 'queue/queue.service';

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
    };
    await this.QueueSVC.addToQueue(queueProcess);
    return newProcess;
  }
  //Read process from DB
  public async findprocess(process_id: string): Promise<IProcess> {
    const process = await this.processModel.findById(process_id);
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

  //Find processes done by user
  public async findUserProcesses(user_id: string): Promise<IProcess[]> {
    const userProcesses = await this.processModel
      .find({ creator: user_id })
      .populate('creator');
    return userProcesses;
  }

  // Find processes done by robot
  public async findRobotProcesses(robot_id: string): Promise<IProcess[]> {
    const robotProcesses = await this.processModel
      .find({
        robot: robot_id,
      })
      .populate('robot');
    return robotProcesses;
  }
  // Find processes for greenhouse
  public async findGreenhouseProcesses(
    greenhouse_id: string,
  ): Promise<IProcess[]> {
    const greenhouseProcesses = await this.processModel
      .find({
        greenhouse: greenhouse_id,
      })
      .populate('robot')
      .populate('creator');
    return greenhouseProcesses;
  }
  //  Find processes For Greenhouse with stats
  public async findProcessStats(greenhouse_id: string) {
    const newgreenhouse_id = new mongoose.Types.ObjectId(greenhouse_id);
    console.log(newgreenhouse_id);
    const proc = await this.processModel.find({ greenhouse: greenhouse_id });
    console.log(proc);
    const greenhouseProcesses = await this.processModel
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

    return greenhouseProcesses;
  }
}
