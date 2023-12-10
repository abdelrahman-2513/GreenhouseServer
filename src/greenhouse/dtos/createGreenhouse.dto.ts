import { IsNumber, IsString } from 'class-validator';

export class CreateGreenhouseDTO {
  @IsString()
  name: string;
  location: object;
  @IsNumber()
  capacity: number;
}
