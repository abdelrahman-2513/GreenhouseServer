import { Injectable, Req } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';

import { UserDocument } from './schemas/user.schema';
import { createUserDTO } from './dtos/createUser.dto';
import * as bcrypt from 'bcrypt';
import { updateUserDTO } from './dtos/updateUser.dto';
import { Request } from 'express';
const { ObjectId } = mongoose.Types;
@Injectable()
export class UserService {
  constructor(@InjectModel('User') private userModel: Model<UserDocument>) {}

  // Create new user Function
  public async createUser(
    userData: createUserDTO,
    req: Request,
  ): Promise<UserDocument> {
    console.log('from create usr');
    console.log(req['user'].id);

    const newUser = new this.userModel(userData);
    newUser.admin = req['user']['id'];
    newUser.password = await this.hashPassword(userData.password);
    await newUser.save();
    return newUser;
  }
  //Read user from DB
  public async findUser(user_id: string): Promise<UserDocument> {
    const user = await this.userModel
      .findById(user_id)
      .populate([{ path: 'greenhouse' }, { path: 'robots' }]);
    return user;
  }
  //Read user from DB using email
  public async findUserByEmail(user_email: string): Promise<UserDocument> {
    const user = await this.userModel.findOne({ email: user_email });
    return user;
  }
  // Read all users
  public async findAllUser(req: Request): Promise<UserDocument[]> {
    const admin = req['user'].id;
    const users = await this.userModel
      .find({ admin: req['user'].id })
      .populate([{ path: 'greenhouse' }, { path: 'robots' }])
      .exec();
    return users;
  }
  // Update user Data
  public async updateUser(
    user_id: string,
    userData: updateUserDTO,
  ): Promise<UserDocument> {
    const updatedUser = await this.userModel.findByIdAndUpdate(
      user_id,
      userData,
    );
    return updatedUser;
  }
  // Delete user
  public async deleteUser(user_id: string) {
    await this.userModel.findByIdAndDelete(user_id);
  }
  // Passwod hashing function
  private async hashPassword(password: string): Promise<string> {
    const hashedPassword = await bcrypt.hash(password, 12);
    return hashedPassword;
  }

  // Add robot to user
  public async addRobotAndUpdate(user_id: string, userRobots: updateUserDTO) {
    const user = await this.userModel.findById(user_id);
    if (userRobots.robots && !user.robots.includes(userRobots.robots[0])) {
      user.robots.push(...userRobots.robots);
    }

    return user.save();
  }
  public async addGreenhouseAndUpdate(
    user_id: string,
    userRobots: updateUserDTO,
  ) {
    const user = await this.userModel.findById(user_id);
    if (
      userRobots.greenhouse &&
      !user.greenhouse.includes(userRobots.greenhouse[0])
    ) {
      user.greenhouse.push(...userRobots.greenhouse);
    }
    await user.populate({ path: 'greenhouse' });
    return user.save();
  }

  public async removeRobot(user_id: string, removeRobot: updateUserDTO) {
    try {
      if (!mongoose.Types.ObjectId.isValid(user_id)) {
        throw new Error('Invalid user_id');
      }

      const user = await this.userModel
        .findById(user_id)
        .populate({ path: 'robots' });

      if (removeRobot.removeRobots && removeRobot.removeRobots[0]) {
        console.log('Removing robots');

        user.robots = user.robots.filter((robot) => {
          return !removeRobot.removeRobots.includes(robot['_id'].toString());
        });

        return user.save();
      }
      throw new Error('Specified robot not found in user.robots');
    } catch (error) {
      console.error('Error removing robot:', error);
      throw new Error('Failed to remove robot');
    }
  }
  public async removeGreenhouse(user_id: string, removeRobot: updateUserDTO) {
    try {
      if (!mongoose.Types.ObjectId.isValid(user_id)) {
        throw new Error('Invalid user_id');
      }

      const user = await this.userModel
        .findById(user_id)
        .populate({ path: 'greenhouse' });

      if (removeRobot.removeGreenhouse && removeRobot.removeGreenhouse[0]) {
        console.log('Removing greenhouse');
        console.log(removeRobot.removeGreenhouse);

        user.greenhouse = user.greenhouse.filter((greenhouse) => {
          console.log(greenhouse['_id']);
          return !removeRobot.removeGreenhouse.includes(
            greenhouse['_id'].toString(),
          );
        });
        console.log(user.greenhouse);
        console.log(user.robots);

        return user.save();
      }
      throw new Error('Specified robot not found in user.robots');
    } catch (error) {
      console.error('Error removing robot:', error);
      throw new Error('Failed to remove robot');
    }
  }
}
