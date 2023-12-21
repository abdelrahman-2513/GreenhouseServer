import { Injectable } from '@nestjs/common';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { UserService } from '../user.service';

@Injectable()
@ValidatorConstraint({ name: 'email', async: true })
export class IsUniqueEmailConstraints implements ValidatorConstraintInterface {
  constructor(private readonly userSVC: UserService) {}
  async validate(email: string) {
    if (!email) return false;
    const isUnique = this.isUnique(email);
    return isUnique;
  }

  defaultMessage(): string {
    return 'This Email already exist or Invalid!';
  }

  private async isUnique(email: string): Promise<boolean> {
    console.log(email);
    console.log(this.userSVC);
    const user = await this.userSVC.findUserByEmail(email);
    console.log(user);

    return !user;
  }
}
