import { Types } from 'mongoose';
import { EUserRoles } from '../enum';

export type ATPayload = {
  id: Types.ObjectId;
  role: EUserRoles;
};
