import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { IssueDocument } from './schemas/issue.schema';
import { RobotService } from 'robot/robot.service';
import { CreateIssueDTO } from './dtos/create.issue.dto';
import { IIssue } from './interface/issue.interface';
import { UpdateIssueDTO } from './dtos/update.issue.dto';
import { EIStatus, ERobotStatus } from 'auth/enum';

@Injectable()
export class IssueService {
  constructor(
    @InjectModel('Issue') private readonly IssueModel: Model<IssueDocument>,
    private readonly RobotSVC: RobotService,
  ) {}
  // Create New Process
  public async createIssue(Issue: CreateIssueDTO): Promise<IIssue> {
    const newIssue = await this.IssueModel.create(Issue);

    await this.RobotSVC.updateRobot(Issue.robot, {
      status: ERobotStatus['NEED TECH'],
    });

    return newIssue;
  }
  //Read Issue from DB
  public async findIssue(Issue_id: string): Promise<IIssue> {
    const Issue = await this.IssueModel.findById(Issue_id);
    return Issue;
  }

  // Read all Issues
  public async findAllIssues(
    page: number = 1,
    pageSize: number = 10,
  ): Promise<IIssue[]> {
    const Issues = await this.IssueModel.find({})
      .populate('robot')
      .populate('creator')
      .skip((page - 1) * pageSize)
      .limit(pageSize);
    return Issues;
  }
  // Update Issue Data
  public async updateIssue(
    Issue_id: string,
    IssueData: UpdateIssueDTO,
  ): Promise<IIssue> {
    const updatedIssue = await this.IssueModel.findByIdAndUpdate(
      Issue_id,
      IssueData,
    );
    return updatedIssue;
  }
  // Delete Issue
  public async deleteIssue(Issue_id: string) {
    await this.IssueModel.findByIdAndDelete(Issue_id);
  }
  // Delete Issue
  public async deleteAllIssue() {
    await this.IssueModel.deleteMany();
  }

  //Find Issuees done by user
  public async findUserIssuees(
    user_id: string,
    page: number = 1,
    pageSize: number = 10,
  ): Promise<IIssue[]> {
    const userIssuees = await this.IssueModel.find({
      creator: user_id,
    })
      .populate('creator')
      .populate('robot')
      .skip((page - 1) * pageSize)
      .limit(pageSize);
    return userIssuees;
  }

  // Assign tech to issue
  public async AssignTechnician(
    issue_id: string,
    tech_id: string,
  ): Promise<IIssue> {
    const AssignedIssue = await this.IssueModel.findByIdAndUpdate(issue_id, {
      technician: tech_id,
      status: EIStatus.ASSIGNED,
    });

    return AssignedIssue;
  }

  // Tech Issues
  public async FindTechIssues(tech_id: string): Promise<{
    resolved: IIssue[];
    unresolved: IIssue[];
  }> {
    const newtech_id = new Types.ObjectId(tech_id);
    console.log(newtech_id);
    const techIssues = await this.IssueModel.find({
      technician: newtech_id,
    })
      .populate('robot')
      .populate('creator');

    const resolved: IIssue[] = [];
    const unresolved: IIssue[] = [];
    techIssues.forEach((issue) => {
      if (issue.status === 'resolved') {
        resolved.push(issue);
      } else {
        unresolved.push(issue);
      }
    });

    return { resolved, unresolved };
  }

  // Out to solve Issue
  public async SolvingIssue(issue_id: string): Promise<IIssue> {
    const Issue = await this.IssueModel.findByIdAndUpdate(issue_id, {
      status: EIStatus['IN PROGRESS'],
    });

    return Issue;
  }

  // Issue Solved
  public async CloseIssue(issue_id: string): Promise<IIssue> {
    const Issue = await this.IssueModel.findByIdAndUpdate(issue_id, {
      status: EIStatus.RESOLVED,
    });
    await this.RobotSVC.updateRobot(String(Issue.robot), {
      status: ERobotStatus.FREE,
    });
    return Issue;
  }

  //Issue Stats
  public async findResolvedAndUnresolvedIssues(greenhouseId: string): Promise<{
    resolved: IIssue[];
    unresolved: IIssue[];
  }> {
    const newtech_id = new Types.ObjectId(greenhouseId);
    const issues = await this.IssueModel.find({ greenhouse: greenhouseId })
      .populate('robot')
      .populate('creator');

    const resolved: IIssue[] = [];
    const unresolved: IIssue[] = [];

    issues.forEach((issue) => {
      if (issue.status === 'resolved') {
        resolved.push(issue);
      } else {
        unresolved.push(issue);
      }
    });

    return { resolved, unresolved };
  }
}
