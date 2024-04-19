import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Types } from 'mongoose';

export type updateDocument = HydratedDocument<Update>;

@Schema()
export class Update {
  @Prop()
  url: string;
  @Prop({ type: mongoose.Types.ObjectId, ref: 'Robot' })
  robots: Types.ObjectId[];
  @Prop({ type: mongoose.Types.ObjectId, ref: 'Robot' })
  updated: Types.ObjectId[];
  @Prop({ type: Date, default: Date.now })
  created_at: Date;
}

export const updateSchema = SchemaFactory.createForClass(Update);
