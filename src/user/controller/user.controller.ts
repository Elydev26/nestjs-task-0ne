import { Body, Controller, Post, UseGuards, UsePipes } from '@nestjs/common';
import { UsersService } from '../service/user.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { ObjectValidationPipe } from 'src/util/pipe/object.validator.pipe';
import { userSchema } from '../validation/user.validator';
import { CreateUserGuard } from '../guard/user.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('signUp')
  @UseGuards(CreateUserGuard)
  @UsePipes(new ObjectValidationPipe(userSchema))
  async create(@Body() user: CreateUserDto): Promise<CreateUserDto> {
    const newUser = await this.usersService.create(user);
    return newUser;
  }
}

// import {
//   Body,
//   Controller,
//   Get,
//   Param,
//   Post,
//   Put,
//   Delete,
//   UseGuards,
// } from '@nestjs/common';
// import { AuthGuard } from '@nestjs/passport';
// import { CreateUserDto } from './dto/create-user.dto';
// import { User } from './interface/user-interface';
// import { UsersService } from './user.service';

// @Controller('users')
// export class UsersController {
//   constructor(private readonly usersService: UsersService) {}

//   @UseGuards(AuthGuard('jwt'))
//   @Get()
//   async findAll(): Promise<User[]> {
//     return this.usersService.findAll();
//   }

//   @UseGuards(AuthGuard('jwt'))
//   @Get(':id')
//   async findOne(@Param('id') id: string): Promise<User> {
//     return this.usersService.findOne(id);
//   }

//   @Post()
//   async create(@Body() createUserDto: CreateUserDto): Promise<User> {
//     const user = new User();
//     user.email = createUserDto.email;
//     user.password = createUserDto.password;
//     return this.usersService.create(user);
//   }

//   @UseGuards(AuthGuard('jwt'))
//   @Put(':id')
//   async update(
//     @Param('id') id: string,
//     @Body() updateUserDto: CreateUserDto,
//   ): Promise<User> {
//     const user = new User();
//     user.email = updateUserDto.email;
//     user.password = updateUserDto.password;
//     return this.usersService.update(id, user);
//   }

//   @UseGuards(AuthGuard('jwt'))
//   @Delete(':id')
//   async remove(@Param('id') id: string): Promise<User> {
//     return this.usersService.remove(id);
//   }
// }
