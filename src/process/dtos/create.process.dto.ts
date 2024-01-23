import { EFeild, EPhase, EProduct, EStatus } from 'auth/enum';
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
  status: EStatus;
  feild: EFeild;
}
