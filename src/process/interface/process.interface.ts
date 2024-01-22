import { EPhase, EProduct } from 'auth/enum';
import { Types } from 'mongoose';

export interface IProcess {
  _id: Types.ObjectId;
  creator?: Types.ObjectId;
  greenhouse?: Types.ObjectId;
  robot?: Types.ObjectId;
  createdAt?: Date;
  type?: EProduct;
  currentPhase?: EPhase;
}
