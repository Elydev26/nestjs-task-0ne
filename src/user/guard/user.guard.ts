/* eslint-disable prettier/prettier */
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  BadRequestException,
} from '@nestjs/common';
import { UsersService } from '../service/user.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { Request } from 'express'

@Injectable()
export class CreateUserGuard implements CanActivate {
  constructor(private readonly usersService: UsersService) {}
  async canActivate(context: ExecutionContext) {
    const req: Request = context.switchToHttp().getRequest();
    const value: CreateUserDto = req.body //as unknown as CreateUserDto;
    const userEmailExist = await this.usersService.findByEmail(value.email);

    if (userEmailExist)
      throw new BadRequestException(
        `user with these ${value.email} already exist, pls provide a new email to proceed`,
      );
    return true;
  }
}
