import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IGStatistics } from 'greenhouse/interfaces/greenhouse.stat.interface';
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
  @Prop({ type: Object })
  statistics: IGStatistics

}

export const greenhouseSchema = SchemaFactory.createForClass(Greenhouse);
