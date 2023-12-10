import {
  HttpException,
  Injectable,
  InternalServerErrorException,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from 'src/user/user.service';
import { AuthedUser } from './types';
import { Response } from 'express';
import { IUser } from 'src/user/interfaces/user.interface.dto';
import { ATPayload } from './payloads/AT.payload';

@Injectable()
export class AuthService {
  constructor(
    private userSVC: UserService,
    private JwtSVC: JwtService,
  ) {}

  // User sign in function
  public async signIn(
    email: string,
    enterdPassword: string,
    @Res() res: Response,
  ) {
    try {
      const user = await this.userSVC.findUserByEmail(email);
      if (!user) {
        throw new UnauthorizedException('User not found');
      }
      const validUser = await this.verifyHash(enterdPassword, user.password);
      if (!validUser) {
        throw new UnauthorizedException('wrong email or password');
      }
      const token = this.generateAccessToken(user);
      const authedUser: AuthedUser = new AuthedUser(user, token);
      console.log(authedUser);
      console.log('from signin');
      res.status(200).send(authedUser);
      //   return authedUser;
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException(err.response.message);
    }
  }
  // Generate access token
  private generateAccessToken(user: IUser): string {
    const ATPayload: ATPayload = {
      id: user._id,
      role: user.role,
    };
    const token = this.JwtSVC.sign(ATPayload, {
      secret: process.env.AT_SECRET,
      expiresIn: '20d',
    });

    return token;
  }
  // verify the hashed password
  private async verifyHash(
    userPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(userPassword, hashedPassword);
  }
}
