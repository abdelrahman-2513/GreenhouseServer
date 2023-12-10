import { IsEmail, IsString } from 'class-validator';
import { IsUniqueEmail } from 'src/auth/decorators/isUniqueEmail.decorator';
import { EUserRoles } from 'src/auth/enum';
import { Robot } from 'src/robot/schemas/robot.schema';
import { Greenhouse } from 'src/greenhouse/schemas/greenhouse.schema';
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
