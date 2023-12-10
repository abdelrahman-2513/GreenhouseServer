import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { UserService } from './user.service';
import { updateUserDTO } from './dtos/updateUser.dto';
import { createUserDTO } from './dtos/createUser.dto';
import { Roles } from 'src/auth/decorators';
import { EUserRoles } from 'src/auth/enum';
@Controller('user')
export class UserController {
  constructor(private userSVC: UserService) {}

  // Endpoint for getting all (users /user/)
  @Get('')
  @Roles(EUserRoles.HOST, EUserRoles.ADMIN)
  private async getAllUsers(@Res() res: Response, @Req() req: Request) {
    try {
      const users = await this.userSVC.findAllUser(req);
      res.status(200).send(users);
    } catch (err) {
      console.log(err);
      res.status(400).send('Sorry try again later');
    }
  }
  @Get('/:user_id')
  private async getUser(
    @Res() res: Response,
    @Param('user_id') user_id: string,
  ) {
    try {
      const user = await this.userSVC.findUser(user_id);
      res.status(200).send(user);
    } catch (err) {
      console.log(err);
      res.status(400).send('Sorry try again later');
    }
  }
  @Patch('/:user_id')
  private async updateUser(
    @Res() res: Response,
    @Param('user_id') user_id: string,
    @Body() updateUser: updateUserDTO,
  ) {
    try {
      const updatedUser = await this.userSVC.updateUser(user_id, updateUser);
      res.status(201).send(updatedUser);
    } catch (err) {
      console.log(err);
      res
        .status(400)
        .send(
          'Sorry try again later and check userId or email and name feilds!',
        );
    }
  }
  @Roles(EUserRoles.ADMIN, EUserRoles.HOST)
  @Post('/')
  private async createUser(
    @Res() res: Response,
    @Body() createUser: createUserDTO,
    @Req() req: Request,
  ) {
    try {
      const newUser = await this.userSVC.createUser(createUser, req);
      res.status(201).send(newUser);
    } catch (err) {
      console.log(err);
      res.status(400).send('Sorry try again later OR check User Feilds!');
    }
  }
  @Delete('/:user_id')
  private async deleteUser(
    @Res() res: Response,
    @Param('user_id') user_id: string,
  ) {
    try {
      const newUser = await this.userSVC.deleteUser(user_id);
      res.status(204).send('Deleted successfully!');
    } catch (err) {
      console.log(err);
      res.status(400).send('Sorry try again later and check userId !');
    }
  }
}
