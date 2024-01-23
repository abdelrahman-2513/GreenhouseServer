import { EFeild, EPhase, EProduct, EStatus } from 'auth/enum';
import { IsOptional } from 'class-validator';

export class UpdateProcessDTO {
  @IsOptional()
  creator?: string;
  @IsOptional()
  greenhouse?: string;
  @IsOptional()
  robot?: string;
  @IsOptional()
  type?: EProduct;
  @IsOptional()
  currentPhase?: EPhase;
  @IsOptional()
  status?: EStatus;
  @IsOptional()
  feild?: EFeild;
}
