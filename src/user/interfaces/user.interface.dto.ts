import { Types } from 'mongoose';
import { EUserRoles } from 'auth/enum';
import { User } from '../schemas/user.schema';
import { IGreenhouse } from 'greenhouse/interfaces/greenhouse.interface';
import { IRobot } from 'robot/interfaces/robot.interface';
import { Robot } from 'robot/schemas/robot.schema';
import { Greenhouse } from 'greenhouse/schemas/greenhouse.schema';

export interface IUser {
  _id?: Types.ObjectId;
  name?: string;
  password?: string;
  role?: EUserRoles;
  email?: string;
  admin?: User;
  createdAt?: Date;
  robots?: Types.ObjectId[];
  greenhouse?: Types.ObjectId[];
}
