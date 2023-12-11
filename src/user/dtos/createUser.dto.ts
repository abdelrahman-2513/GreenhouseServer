import { IsEmail, IsString } from 'class-validator';
import { IsUniqueEmail } from 'auth/decorators/isUniqueEmail.decorator';
import { EUserRoles } from 'auth/enum';
import { Robot } from 'robot/schemas/robot.schema';
import { Greenhouse } from 'greenhouse/schemas/greenhouse.schema';
import { User } from '../schemas/user.schema';

export class createUserDTO {
  @IsString()
  name: string;
  @IsEmail()
  // @IsUniqueEmail()
  email: string;
  @IsString()
  password: string;
  role: EUserRoles;

  admin?: User;
  createdAt: Date;
  robots: Robot[];
  greenhouses: Greenhouse[];
}
