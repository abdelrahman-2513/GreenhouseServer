import { IUser } from 'user/interfaces/user.interface.dto';
import { EUserRoles } from '../enum';
import { Types } from 'mongoose';
import { User } from 'user/schemas/user.schema';
import { IRobot } from 'robot/interfaces/robot.interface';
import { IGreenhouse } from 'greenhouse/interfaces/greenhouse.interface';
import { Robot } from 'robot/schemas/robot.schema';
import { Greenhouse } from 'greenhouse/schemas/greenhouse.schema';

export class LoggedUser implements IUser {
  _id?: Types.ObjectId;
  email?: string;
  name?: string;
  role?: EUserRoles;
  admin?: User;
  password?: string;
  robots?: Types.ObjectId[];
  greenhouse?: Types.ObjectId[];
  constructor(user: IUser) {
    this._id = user._id;
    this.email = user.email;
    this.name = user.name;
    this.role = user.role;
    this.password = user.password;
    this.admin = user.admin;
    this.greenhouse = user.greenhouse;
  }
}
export class AuthedUser {
  user: IUser;

  access_token: string;

  constructor(user: IUser, accessToken: string) {
    this.user = new LoggedUser(user);
    this.access_token = accessToken;
  }
}
