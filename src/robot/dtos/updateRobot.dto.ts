import { IsOptional, IsString } from 'class-validator';
import { EPhase, ERobotStatus } from 'src/auth/enum';

export class UpdateRobotDTO {
  @IsOptional()
  name: string;
  @IsOptional()
  statistics: object;
  @IsOptional()
  currentPhase: EPhase;
  @IsOptional()
  status: ERobotStatus;
}
