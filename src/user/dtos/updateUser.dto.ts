import { IsOptional } from 'class-validator';
import { IGreenhouse } from 'greenhouse/interfaces/greenhouse.interface';
import { Greenhouse } from 'greenhouse/schemas/greenhouse.schema';
import mongoose, { Types } from 'mongoose';
import { IRobot } from 'robot/interfaces/robot.interface';
import { Robot } from 'robot/schemas/robot.schema';

export class updateUserDTO {
  @IsOptional()
  email: string;
  @IsOptional()
  name: string;
  robots: mongoose.Types.ObjectId[];
  greenhouse: Types.ObjectId[];
  removeRobots?: string[];
  removeGreenhouse?: string[];
}
