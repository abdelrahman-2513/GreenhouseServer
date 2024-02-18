import { IsNumber, IsString } from 'class-validator';
import { IGStatistics } from 'greenhouse/interfaces/greenhouse.stat.interface';

export class CreateGreenhouseDTO {
  @IsString()
  name: string;
  location: object;
  @IsNumber()
  capacity: number;
  @IsNumber()
  trackWidth: number;
  @IsNumber()
  fieldWidth: number;
  @IsNumber()
  areaWidth: number;
  @IsNumber()
  areaLength: number;
  statistics: IGStatistics;
}
