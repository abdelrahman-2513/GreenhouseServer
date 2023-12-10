import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type greenhouseDocument = HydratedDocument<Greenhouse>;

@Schema()
export class Greenhouse {
  @Prop()
  name: string;
  @Prop({ type: Object })
  location: object;
  @Prop()
  capacity: number;
}

export const greenhouseSchema = SchemaFactory.createForClass(Greenhouse);
