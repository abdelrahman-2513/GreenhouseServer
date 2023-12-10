import { Types } from 'mongoose';
import { EPhase, ERobotStatus } from 'src/auth/enum';
import { IGreenhouse } from 'src/greenhouse/interfaces/greenhouse.interface';
import { Greenhouse } from 'src/greenhouse/schemas/greenhouse.schema';

export interface IRobot {
  _id: Types.ObjectId;
  name?: string;
  statistics?: object;
  currentPhase?: EPhase;
  status?: ERobotStatus;
  greenhouse?: Greenhouse;
}
