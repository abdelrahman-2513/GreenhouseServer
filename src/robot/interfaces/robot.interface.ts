import { Types } from 'mongoose';
import { EPhase, ERobotStatus } from 'auth/enum';
import { IGreenhouse } from 'greenhouse/interfaces/greenhouse.interface';
import { Greenhouse } from 'greenhouse/schemas/greenhouse.schema';

export interface IRobot {
  _id: Types.ObjectId;
  name?: string;
  statistics?: object;
  currentPhase?: EPhase;
  status?: ERobotStatus;
  greenhouse?: Greenhouse;
}
