import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  Res,
} from '@nestjs/common';
import { IssueService } from './issue.service';
import { CreateIssueDTO } from './dtos/create.issue.dto';
import { Request, Response } from 'express';
import { UpdateIssueDTO } from './dtos/update.issue.dto';
import { Roles } from 'auth/decorators';
import { EUserRoles } from 'auth/enum';

@Controller('issue')
export class IssueController {
  constructor(private issueSVC: IssueService) {}
  @Post('/')
  private async createIssue(
    @Res() res: Response,
    @Body() createIssue: CreateIssueDTO,
  ) {
    try {
      const newIssue = await this.issueSVC.createIssue(createIssue);
      res.status(201).send(newIssue);
    } catch (err) {
      console.log(err);
      res.status(400).send('Try again later or contact the technican!');
    }
  }
  // Get all Issue

  @Get('')
  private async getAllIssue(
    @Res() res: Response,
    @Query('page') page: number,
    @Query('pageSize') pageSize: number,
  ) {
    try {
      const greenhouses = await this.issueSVC.findAllIssues(page, pageSize);
      res.status(200).send(greenhouses);
    } catch (err) {
      console.log(err);
      res.status(400).send('Sorry try again later');
    }
  }
  // Get Issue
  @Get('/:Issue_id')
  private async getHouse(
    @Res() res: Response,
    @Param('Issue_id') Issue_id: string,
  ) {
    try {
      const Issue = await this.issueSVC.findIssue(Issue_id);
      res.status(200).send(Issue);
    } catch (err) {
      console.log(err);
      res.status(400).send('Sorry try again later');
    }
  }
  // Update Issue
  @Patch('/:Issue_id')
  private async updatehouse(
    @Res() res: Response,
    @Param('Issue_id') Issue_id: string,
    @Body() updateIssue: UpdateIssueDTO,
  ) {
    try {
      const updatedhouse = await this.issueSVC.updateIssue(
        Issue_id,
        updateIssue,
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
  private async deleteAllIssuees(@Res() res: Response) {
    try {
      const newhouse = await this.issueSVC.deleteAllIssue();
      res.status(204).send('Deleted successfully!');
    } catch (err) {
      console.log(err);
      res.status(400).send('Sorry try again later and check houseId !');
    }
  }
  // Delete Issue
  @Delete('/:Issue_id')
  private async deletehouse(
    @Res() res: Response,
    @Param('Issue_id') Issue_id: string,
  ) {
    try {
      const newhouse = await this.issueSVC.deleteIssue(Issue_id);
      res.status(204).send('Deleted successfully!');
    } catch (err) {
      console.log(err);
      res.status(400).send('Sorry try again later and check houseId !');
    }
  }

  // Get user Issuees
  @Get('/user/:user_id')
  private async getUserIssuees(
    @Res() res: Response,
    @Param('user_id') user_id: string,
    @Query('page') page: number,
    @Query('pageSize') pageSize: number,
  ) {
    try {
      const Issue = await this.issueSVC.findUserIssuees(
        user_id,
        page,
        pageSize,
      );
      res.status(200).send(Issue);
    } catch (err) {
      console.log(err);
      res.status(400).send('Sorry try again later');
    }
  }

  // Assign technician to an Issue
  @Roles(EUserRoles.TECHNICIAN)
  @Post('/assign/:issue_id')
  async AssignTechnicican(
    @Param('issue_id') issue_id: string,
    @Res() res: Response,
    @Req() req: Request,
    // @Param('tech_id') tech_id: string,
  ) {
    try {
      const tech_id = req['user'].id;
      console.log(tech_id);
      const Issue = await this.issueSVC.AssignTechnician(issue_id, tech_id);
      res.status(200).send(Issue);
    } catch (err) {
      console.log(err);
      res.status(400).send('Sorry try again later');
    }
  }

  // Find technician issues
  @Post('technician/')
  async FindAllTechIssues(@Res() res: Response, @Req() req: Request) {
    try {
      const tech_id = req['user'].id;
      console.log(tech_id);

      const techIssues = await this.issueSVC.FindTechIssues(tech_id);
      res.status(200).send(techIssues);
    } catch (err) {
      console.log(err);
      res.status(400).send('Sorry try again later');
    }
  }
  // Solve technician issues
  @Roles(EUserRoles.TECHNICIAN)
  @Post('/solve/:issue_id')
  async OutToSolveIssue(
    @Param('issue_id') issue_id: string,
    @Res() res: Response,
  ) {
    try {
      const techIssues = await this.issueSVC.SolvingIssue(issue_id);
      res.status(200).send(techIssues);
    } catch (err) {
      console.log(err);
      res.status(400).send('Sorry try again later');
    }
  }
  // Close technician issues
  @Roles(EUserRoles.TECHNICIAN)
  @Post('/close/:issue_id')
  async CloseIssue(@Res() res: Response, @Param('issue_id') issue_id: string) {
    try {
      const techIssues = await this.issueSVC.CloseIssue(issue_id);
      res.status(200).send(techIssues);
    } catch (err) {
      console.log(err);
      res.status(400).send('Sorry try again later');
    }
  }

  // Get house issue stats
  @Get('/greenhouse/:house_id')
  async GreenhouseIssuesStats(
    @Res() res: Response,
    @Param('house_id') house_id: string,
  ) {
    try {
      const houseIssues =
        await this.issueSVC.findResolvedAndUnresolvedIssues(house_id);
      res.status(200).send(houseIssues);
    } catch (err) {
      console.log(err);
      res.status(400).send('Sorry try again later');
    }
  }
}
