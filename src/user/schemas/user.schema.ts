import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Types } from 'mongoose';
import { EUserRoles } from 'auth/enum';

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
  robots: Types.ObjectId[];
  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'Greenhouse' }])
  greenhouse: Types.ObjectId[];
}

export const userSchema = SchemaFactory.createForClass(User);
