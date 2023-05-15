import {
  Controller,
  Post,
  Body,
  Get,
  Request,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { LoginDto } from '../dto/create-auth.dto';
import { ObjectValidationPipe } from 'src/util/pipe/object.validator.pipe';
import { authSchema } from '../validation/auth.validator';
import { JwtAuthGuard } from '../guard/jwt.auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @UseGuards(JwtAuthGuard)
  @Post('login')
  @UsePipes(new ObjectValidationPipe(authSchema))
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('user')
  getUser(@Request() req: any) {
    return req.user;
  }
}
