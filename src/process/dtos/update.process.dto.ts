import { EPhase, EProduct } from 'auth/enum';
import { IsOptional } from 'class-validator';

export class UpdateProcessDTO {
  @IsOptional()
  creator: string;
  @IsOptional()
  greenhouse: string;
  @IsOptional()
  robot: string;
  @IsOptional()
  type: EProduct;
  @IsOptional()
  currentPhase: EPhase;
}
