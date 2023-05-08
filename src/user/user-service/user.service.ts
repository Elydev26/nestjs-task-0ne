import { Injectable, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { ExtractJwt } from 'passport-jwt';
import { User, UserSchema } from '../model/create-user.model';
import { CreateUserDto } from '../dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(user: CreateUserDto): Promise<User> {
    const userExit = await this.userModel.findOne({ email: user.email });
    if (userExit)
      throw new ConflictException(
        'User with these email already exist, pls input new email to register',
      );
    const createdUser = new this.userModel({
      ...user,
    });
    const result = await this.hashPassword(createdUser.password);
    createdUser.password = result;
    return await createdUser.save();
  }

  async findByUsername(username: string): Promise<User> {
    return this.userModel.findOne({ username }).exec();
  }

  async findById(id: string): Promise<User> {
    return this.userModel.findById(id).exec();
  }

  async findByEmail(email: string): Promise<User> {
    return this.userModel.findOne({ email }).exec();
  }

  async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    return bcrypt.hash(password, salt);
  }

  async comparePasswords(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }
}

// import { Injectable } from '@nestjs/common';
// import { InjectModel } from '@nestjs/mongoose';
// import { Model } from 'mongoose';
// import { User } from './user.model';
// import * as bcrypt from 'bcrypt';

// @Injectable()
// export class UsersService {
//   constructor(@InjectModel(User.name) private userModel: Model<User>) {}

//   async create(user: User): Promise<User> {
//     const salt = bcrypt.genSaltSync();
//     const hashedPassword = bcrypt.hashSync(user.password, salt);
//     const createdUser = new this.userModel({
//       ...user,
//       password: hashedPassword,
//     });
//     return createdUser.save();
//   }

//   async findByUsername(username: string): Promise<User> {
//     return this.userModel.findOne({ username }).exec();
//   }

//   async findById(id: string): Promise<User> {
//     return this.userModel.findById(id).exec();
// //   }
// // }
