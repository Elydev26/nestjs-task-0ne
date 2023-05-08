import { Module } from '@nestjs/common';
import { UsersController } from './user-controller/user.controller';
import { UsersService } from './user-service/user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './model/create-user.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UserModule {}
