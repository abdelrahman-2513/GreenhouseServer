import { Types } from 'mongoose';
import { EUserRoles } from 'src/auth/enum';
import { User } from '../schemas/user.schema';
import { IGreenhouse } from 'src/greenhouse/interfaces/greenhouse.interface';
import { IRobot } from 'src/robot/interfaces/robot.interface';
import { Robot } from 'src/robot/schemas/robot.schema';
import { Greenhouse } from 'src/greenhouse/schemas/greenhouse.schema';

export interface IUser {
  _id?: Types.ObjectId;
  name?: string;
  password?: string;
  role?: EUserRoles;
  email?: string;
  admin?: User;
  createdAt?: Date;
  robots?: Robot[];
  greenhouses?: Greenhouse[];
}
