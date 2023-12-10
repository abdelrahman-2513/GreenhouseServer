import { IsOptional } from 'class-validator';
import { IGreenhouse } from 'src/greenhouse/interfaces/greenhouse.interface';
import { Greenhouse } from 'src/greenhouse/schemas/greenhouse.schema';
import { IRobot } from 'src/robot/interfaces/robot.interface';
import { Robot } from 'src/robot/schemas/robot.schema';

export class updateUserDTO {
  @IsOptional()
  email: string;
  @IsOptional()
  name: string;
  robots: Robot[];
  greenhouses: Greenhouse[];
}
