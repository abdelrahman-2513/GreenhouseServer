import { IsNumber, IsOptional, IsString } from 'class-validator';
import { IGStatistics } from 'greenhouse/interfaces/greenhouse.stat.interface';

export class UpdateGreenhouseDTO {
  @IsOptional()
  name: string;
  @IsOptional()
  location: object;
  @IsOptional()
  capacity: number;
  statistics: IGStatistics;
}
