import { IsString } from 'class-validator';
import { EPhase, ERobotStatus } from 'src/auth/enum';
import { IGreenhouse } from 'src/greenhouse/interfaces/greenhouse.interface';
import { Greenhouse } from 'src/greenhouse/schemas/greenhouse.schema';

export class CreateRobotDTO {
  @IsString()
  name: string;
  statistics: object;
  @IsString()
  currentPhase: EPhase;
  @IsString()
  status: ERobotStatus;
  greenhouse: Greenhouse;
}
