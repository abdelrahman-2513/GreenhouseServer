import { IsEmail, IsString } from 'class-validator';
import { EUserRoles } from 'auth/enum';
import { Robot } from 'robot/schemas/robot.schema';
import { Greenhouse } from 'greenhouse/schemas/greenhouse.schema';
import { User } from '../schemas/user.schema';
import { Types } from 'mongoose';
import { UserService } from 'user/user.service';
import { IsUniqueEmail } from 'auth/decorators/isUniqueEmail.decorator';
// import { IsUniqueEmail } from 'user/validators/unique-emqil.validator';

export class createUserDTO {
  @IsString()
  name: string;
  @IsEmail()
  // @IsUniqueEmail()
  // @IsUniqueEmail()
  @IsUniqueEmail()
  email: string;
  @IsString()
  password: string;
  role: EUserRoles;

  admin?: User;
  createdAt: Date;
  robots: Types.ObjectId[];
  greenhouse: Types.ObjectId[];
}
