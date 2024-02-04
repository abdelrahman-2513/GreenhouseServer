import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { ProcessService } from './process.service';
import { Response } from 'express';
import { CreateProcessDTO } from './dtos/create.process.dto';
import { Public } from 'auth/decorators';
import { UpdateProcessDTO } from './dtos/update.process.dto';

@Controller('process')
export class ProcessController {
  constructor(private ProcessSVC: ProcessService) {}
  // Create Process

  @Post('/')
  private async createProcess(
    @Res() res: Response,
    @Body() createProcess: CreateProcessDTO,
  ) {
    try {
      const newProcess = await this.ProcessSVC.createProcess(createProcess);
      res.status(201).send(newProcess);
    } catch (err) {
      console.log(err);
      res.status(400).send('Try again later or contact the technican!');
    }
  }
  // Get all Process

  @Get('')
  private async getAllProcess(@Res() res: Response) {
    try {
      const greenhouses = await this.ProcessSVC.findAllprocesss();
      res.status(200).send(greenhouses);
    } catch (err) {
      console.log(err);
      res.status(400).send('Sorry try again later');
    }
  }
  // Get Process
  @Get('/:process_id')
  private async getHouse(
    @Res() res: Response,
    @Param('process_id') process_id: string,
  ) {
    try {
      const process = await this.ProcessSVC.findprocess(process_id);
      res.status(200).send(process);
    } catch (err) {
      console.log(err);
      res.status(400).send('Sorry try again later');
    }
  }
  // Update Process
  @Patch('/:process_id')
  private async updatehouse(
    @Res() res: Response,
    @Param('process_id') process_id: string,
    @Body() updateProcess: UpdateProcessDTO,
  ) {
    try {
      const updatedhouse = await this.ProcessSVC.updateprocess(
        process_id,
        updateProcess,
      );
      res.status(201).send(updatedhouse);
    } catch (err) {
      console.log(err);
      res
        .status(400)
        .send(
          'Sorry try again later and check houseId or email and name feilds!',
        );
    }
  }
  @Delete('/')
  private async deleteAllProcesses(@Res() res: Response) {
    try {
      const newhouse = await this.ProcessSVC.deleteAllprocess();
      res.status(204).send('Deleted successfully!');
    } catch (err) {
      console.log(err);
      res.status(400).send('Sorry try again later and check houseId !');
    }
  }
  // Delete Process
  @Delete('/:process_id')
  private async deletehouse(
    @Res() res: Response,
    @Param('process_id') process_id: string,
  ) {
    try {
      const newhouse = await this.ProcessSVC.deleteprocess(process_id);
      res.status(204).send('Deleted successfully!');
    } catch (err) {
      console.log(err);
      res.status(400).send('Sorry try again later and check houseId !');
    }
  }

  // Get user PRocesses
  @Get('/user/:user_id')
  private async getUserProcesses(
    @Res() res: Response,
    @Param('user_id') user_id: string,
  ) {
    try {
      const process = await this.ProcessSVC.findUserProcesses(user_id);
      res.status(200).send(process);
    } catch (err) {
      console.log(err);
      res.status(400).send('Sorry try again later');
    }
  }
  // Get Robot Processes
  @Get('/robot/:robot_id')
  private async getRobotProcesses(
    @Res() res: Response,
    @Param('robot_id') robot_id: string,
    @Query('page') page: number,
    @Query('pageSize') pageSize: number,
  ) {
    try {
      const processes = await this.ProcessSVC.findRobotProcesses(
        robot_id,
        page,
        pageSize,
      );
      res.status(200).send(processes);
    } catch (err) {
      console.log(err);
      res.status(400).send('Sorry, try again later');
    }
  }

  // Get greenhouse Processes
  @Get('/greenhouse/:house_id')
  private async getHouseProcesses(
    @Res() res: Response,
    @Param('house_id') house_id: string,
    @Query('page') page: number,
    @Query('pageSize') pageSize: number,
  ) {
    try {
      const process = await this.ProcessSVC.findGreenhouseProcesses(
        house_id,
        page,
        pageSize,
      );
      res.status(200).send(process);
    } catch (err) {
      console.log(err);
      res.status(400).send('Sorry try again later');
    }
  }
  // Get greenhouse stats
  @Get('/greenhouse/stats/:house_id')
  private async getGreenhouseStats(
    @Res() res: Response,
    @Param('house_id') house_id: string,
  ) {
    try {
      const process = await this.ProcessSVC.findProcessStats(house_id);
      res.status(200).send(process);
    } catch (err) {
      console.log(err);
      res.status(400).send('Sorry try again later');
    }
  }
  @Get('/recent/:house_id')
  async getRecentProcesses(
    @Res() res: Response,
    @Param('house_id') house_id: string,
  ) {
    try {
      const process = await this.ProcessSVC.getRecentProcessesByField(house_id);
      res.status(200).send(process);
    } catch (err) {
      console.log(err);
      res.status(400).send('Sorry try again later');
    }
  }
}
