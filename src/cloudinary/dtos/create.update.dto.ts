import { IsString } from 'class-validator';
import { Types } from 'mongoose';

export class CreateUpdateDTO {
  @IsString()
  url: string;
  robots: Types.ObjectId[];
  updated: Types.ObjectId[];
}
