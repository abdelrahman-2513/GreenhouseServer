import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Res,
} from '@nestjs/common';
import { RobotService } from './robot.service';
import { Response } from 'express';
import { UpdateRobotDTO } from './dtos/updateRobot.dto';
import { Roles } from 'src/auth/decorators';
import { EUserRoles } from 'src/auth/enum';
import { CreateRobotDTO } from './dtos/createRobot.dto';
@Controller('robot')
export class RobotController {
  constructor(private robotSVC: RobotService) {}
  // Endpoint for getting all (robots /robot/)
  @Get('')
  private async getAllRobots(@Res() res: Response) {
    try {
      const Robots = await this.robotSVC.findAllRobots();
      res.status(200).send(Robots);
    } catch (err) {
      console.log(err);
      res.status(400).send('Sorry try again later');
    }
  }
  @Get('/:Robot_id')
  private async getRobot(
    @Res() res: Response,
    @Param('Robot_id') Robot_id: string,
  ) {
    try {
      const Robot = await this.robotSVC.findRobot(Robot_id);
      res.status(200).send(Robot);
    } catch (err) {
      console.log(err);
      res.status(400).send('Sorry try again later');
    }
  }
  @Patch('/:Robot_id')
  private async updateRobot(
    @Res() res: Response,
    @Param('Robot_id') Robot_id: string,
    @Body() updateRobot: UpdateRobotDTO,
  ) {
    try {
      const updatedRobot = await this.robotSVC.updateRobot(
        Robot_id,
        updateRobot,
      );
      res.status(201).send(updatedRobot);
    } catch (err) {
      console.log(err);
      res
        .status(400)
        .send(
          'Sorry try again later and check RobotId or email and name feilds!',
        );
    }
  }
  @Roles(EUserRoles.ADMIN)
  @Post('/')
  private async createRobot(
    @Res() res: Response,
    @Body() createRobot: CreateRobotDTO,
  ) {
    try {
      const newRobot = await this.robotSVC.createRobot(createRobot);
      res.status(201).send(newRobot);
    } catch (err) {
      console.log(err);
      res.status(400).send('Sorry try again later OR check Robot Feilds!');
    }
  }
  @Delete('/:Robot_id')
  private async deleteRobot(
    @Res() res: Response,
    @Param('Robot_id') Robot_id: string,
  ) {
    try {
      const newRobot = await this.robotSVC.deleteRobot(Robot_id);
      res.status(204).send('Deleted successfully!');
    } catch (err) {
      console.log(err);
      res.status(400).send('Sorry try again later and check RobotId !');
    }
  }
}
