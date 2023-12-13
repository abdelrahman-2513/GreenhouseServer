import { Injectable, Req } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument } from './schemas/user.schema';
import { createUserDTO } from './dtos/createUser.dto';
import * as bcrypt from 'bcrypt';
import { updateUserDTO } from './dtos/updateUser.dto';
import { Request } from 'express';
@Injectable()
export class UserService {
  constructor(@InjectModel('User') private userModel: Model<UserDocument>) {}

  // Create new user Function
  public async createUser(
    userData: createUserDTO,
    req: Request,
  ): Promise<UserDocument> {
    console.log('from create usr');
    // console.log(req['user'].id);

    const newUser = new this.userModel(userData);
    // newUser.admin = req['user']['id'];
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
}
