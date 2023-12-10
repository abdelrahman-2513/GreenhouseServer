import { IUser } from 'src/user/interfaces/user.interface.dto';
import { EUserRoles } from '../enum';
import { Types } from 'mongoose';
import { User } from 'src/user/schemas/user.schema';
import { IRobot } from 'src/robot/interfaces/robot.interface';
import { IGreenhouse } from 'src/greenhouse/interfaces/greenhouse.interface';
import { Robot } from 'src/robot/schemas/robot.schema';
import { Greenhouse } from 'src/greenhouse/schemas/greenhouse.schema';

export class LoggedUser implements IUser {
  _id?: Types.ObjectId;
  email?: string;
  name?: string;
  role?: EUserRoles;
  admin?: User;
  password?: string;
  robots?: Robot[];
  greenhouses?: Greenhouse[];
  constructor(user: IUser) {
    this._id = user._id;
    this.email = user.email;
    this.name = user.name;
    this.role = user.role;
    this.password = user.password;
    this.admin = user.admin;
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
