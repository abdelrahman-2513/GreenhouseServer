import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { userSchema } from './schemas/user.schema';
import { IsUniqueEmailConstraints } from './validators/isUniqueEmail.validator';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: userSchema }])],
  providers: [UserService, IsUniqueEmailConstraints],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
