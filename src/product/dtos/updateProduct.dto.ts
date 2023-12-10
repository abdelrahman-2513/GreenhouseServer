import { IsOptional } from 'class-validator';
import { EProduct } from 'src/auth/enum';

export class UpdateProductDTO {
  @IsOptional()
  name: string;
  @IsOptional()
  quantity: number;
  @IsOptional()
  type: EProduct;
  @IsOptional()
  phases: object[];
}
