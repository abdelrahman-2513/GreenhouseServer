import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Types } from 'mongoose';
import { EPhase, ERobotStatus } from 'auth/enum';

export type RobotDocument = HydratedDocument<Robot>;

@Schema()
export class Robot {
  @Prop()
  name: string;
  @Prop({ type: Object })
  statistics: object;
  @Prop()
  currentPhase: EPhase;
  @Prop()
  status: ERobotStatus;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Greenhouse' })
  greenhouse: Types.ObjectId;
}

export const robotSchema = SchemaFactory.createForClass(Robot);
