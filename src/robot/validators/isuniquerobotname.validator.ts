import { Injectable } from '@nestjs/common';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { RobotService } from 'robot/robot.service';
@Injectable()
@ValidatorConstraint({ name: 'name', async: true })
export class IsUniqueNameConstraints implements ValidatorConstraintInterface {
  constructor(private readonly RobotSVC: RobotService) {}
  async validate(name: string) {
    if (!name) return false;
    const isUnique = this.isUnique(name);
    return isUnique;
  }

  defaultMessage(): string {
    return 'This Name already exist or Invalid!';
  }

  private async isUnique(name: string): Promise<boolean> {
    console.log(name);
    console.log(this.RobotSVC);
    const robot = await this.RobotSVC.getRobotId(name);
    console.log(robot);

    return !robot;
  }
}
