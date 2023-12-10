import { Types } from 'mongoose';
import { EProduct } from 'src/auth/enum';
import { Greenhouse } from 'src/greenhouse/schemas/greenhouse.schema';

export interface IProduct {
    _id?: Types.ObjectId;
  name?: string;
  type?: EProduct;
  quantity?: number;
  greenhouse?: Greenhouse;
  phase?: object[];
}
