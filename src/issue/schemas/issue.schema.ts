import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { EIStatus } from 'auth/enum';
import mongoose, { HydratedDocument, Types } from 'mongoose';

export type IssueDocument = HydratedDocument<Issue>;

@Schema()
export class Issue {
  @Prop()
  title: string;
  @Prop()
  description: string;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  creator: Types.ObjectId;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  technician: Types.ObjectId;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Robot' })
  robot: Types.ObjectId;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Greenhouse' })
  greenhouse: Types.ObjectId;
  @Prop({ type: Date, default: Date.now() })
  createdAt: Date;
  @Prop({ type: Date })
  resolvedAt: Date;
  @Prop({ default: EIStatus.CREATED })
  status: EIStatus;
}

export const IssueSchema = SchemaFactory.createForClass(Issue);
