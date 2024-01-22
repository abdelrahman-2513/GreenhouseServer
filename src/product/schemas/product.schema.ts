import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Types } from 'mongoose';
import { EProduct } from 'auth/enum';

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
  greenhouse: Types.ObjectId;
  @Prop({ type: mongoose.Schema.Types.ObjectId ,ref: 'Process'})
  Phases: Types.ObjectId;
}
export const productSchema = SchemaFactory.createForClass(Product);
