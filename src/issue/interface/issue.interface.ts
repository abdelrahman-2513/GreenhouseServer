import { EIStatus } from 'auth/enum';
import { Types } from 'mongoose';

export interface IIssue {
  _id?: Types.ObjectId;
  creator?: Types.ObjectId;
  greenhouse?: Types.ObjectId;
  robot?: Types.ObjectId;
  technician?: Types.ObjectId;
  description?: String;
  title?: string;
  createdAt?: Date;
  resolvedAt?: Date;
  status?: EIStatus;
}
