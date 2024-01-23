import { EFeild, EPhase } from 'auth/enum';
import { Types } from 'mongoose';

export interface IGProcess {
  id?: Types.ObjectId;
  feild?: EFeild;
  type?: EPhase;
}
