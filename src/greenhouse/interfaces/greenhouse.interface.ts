import { Types } from 'mongoose';

export interface IGreenhouse {
  _id?: Types.ObjectId;
  name?: string;
  location?: object;
  capacity?: number;
}
