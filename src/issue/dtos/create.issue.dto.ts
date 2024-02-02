import { IsOptional, IsString } from 'class-validator';

export class CreateIssueDTO {
  @IsString()
  creator: string;
  @IsString()
  greenhouse: string;
  @IsString()
  robot: string;
  @IsOptional()
  technician: string;
  @IsString()
  description: String;
  @IsString()
  title: string;
}
