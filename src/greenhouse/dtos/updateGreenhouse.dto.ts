import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateGreenhouseDTO {
  @IsOptional()
  name: string;
  @IsOptional()
  location: object;
  @IsOptional()
  capacity: number;
}
