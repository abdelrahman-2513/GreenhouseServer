import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { EPhase, EProduct } from 'auth/enum';
import mongoose, { HydratedDocument, Types } from 'mongoose';

export type ProcessDocument = HydratedDocument<Process>;

@Schema()
export class Process {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  creator: Types.ObjectId;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Greenhouse' })
  greenhouse: Types.ObjectId;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Robot' })
  robot: Types.ObjectId;
  @Prop({ type: Date, default: Date.now })
  createdAt: Date;
  @Prop()
  type: EProduct;
  @Prop()
  currentPhase: EPhase;
}

export const processSchema = SchemaFactory.createForClass(Process);
