import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { userSchema } from './schemas/user.schema';
import { IsUniqueEmailConstraints } from './validators/isUniqueEmail.validator';
import { GreenhouseModule } from 'greenhouse/greenhouse.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: userSchema }]),
    GreenhouseModule,
  ],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
