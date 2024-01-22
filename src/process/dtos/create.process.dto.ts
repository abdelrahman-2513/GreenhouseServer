import { EPhase, EProduct } from 'auth/enum';
import { IsString } from 'class-validator';

export class CreateProcessDTO {
  @IsString()
  creator: string;
  @IsString()
  greenhouse: string;
  @IsString()
  robot: string;
  type: EProduct;
  currentPhase: EPhase;
}
