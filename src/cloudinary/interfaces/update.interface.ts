import { Types } from 'mongoose';

export interface IUpdate {
  _id?: Types.ObjectId;
  url?: string;
  robots?: Types.ObjectId[];
  updated?: Types.ObjectId[];
  created_at?: Date;
}
