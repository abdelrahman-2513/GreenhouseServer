import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './decorators';
import { Response } from 'express';
import { LogDTO } from 'src/auth/dtos/Login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authSVC: AuthService) {}
  @Public()
  @Post('/login')
  async login(@Body() userData: LogDTO, @Res() res: Response) {
    // try {
    //   const user = await this.authSVC.signIn(
    //     userData.email,
    //     userData.password,
    //     res,
    //   );
    //   res.status(200).send(user);
    // } catch (err) {
    //   console.log(err);
    // }
    return await this.authSVC.signIn(userData.email, userData.password, res);
  }
}
