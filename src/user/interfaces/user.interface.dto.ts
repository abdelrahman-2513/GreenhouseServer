import { Types } from 'mongoose';
import { EUserRoles } from 'auth/enum';
import { User } from '../schemas/user.schema';

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
