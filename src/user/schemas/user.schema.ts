import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Types } from 'mongoose';
import { EUserRoles } from 'auth/enum';
import { Greenhouse } from 'greenhouse/schemas/greenhouse.schema';
import { Robot } from 'robot/schemas/robot.schema';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop()
  name: string;
  @Prop()
  email: string;
  @Prop()
  role: EUserRoles;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  admin: User;
  @Prop()
  password: string;
  @Prop({ type: Date, default: Date.now })
  createdAt: Date;
  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'Robot' }])
  robots: Robot[];
  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'Greenhouse' }])
  greenhouse: Greenhouse[];
}

export const userSchema = SchemaFactory.createForClass(User);
