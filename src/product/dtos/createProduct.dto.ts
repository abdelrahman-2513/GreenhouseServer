import { IsNumber, IsString } from 'class-validator';
import { EProduct } from 'auth/enum';
import { Greenhouse } from 'greenhouse/schemas/greenhouse.schema';

export class CreateProductDTO {
  @IsString()
  name: string;
  @IsNumber()
  quantity: number;
  @IsString()
  type: EProduct;
  greenhouse: Greenhouse;
  phases: object[];
}
