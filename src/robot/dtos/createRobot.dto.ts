import { IsString } from 'class-validator';
import { EPhase, ERobotStatus } from 'auth/enum';
import { IGreenhouse } from 'greenhouse/interfaces/greenhouse.interface';
import { Greenhouse } from 'greenhouse/schemas/greenhouse.schema';

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
