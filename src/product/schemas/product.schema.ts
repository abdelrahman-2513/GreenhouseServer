import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { EProduct } from 'src/auth/enum';
import { Greenhouse } from 'src/greenhouse/schemas/greenhouse.schema';

export type ProductDocument = HydratedDocument<Product>;

@Schema()
export class Product {
  @Prop()
  name: string;
  @Prop()
  type: EProduct;
  @Prop()
  quantity: number;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Greenhouse' })
  greenhouse: Greenhouse;
  @Prop([{ type: Object }])
  Phases: object[];
}
export const productSchema = SchemaFactory.createForClass(Product);
