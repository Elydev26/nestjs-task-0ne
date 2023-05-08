import {
  Controller,
  Post,
  Body,
  Get,
  Request,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { AuthService } from '../auth-service/auth.service';
import { LoginDto } from '../dto/create-auth.dto';
import { JwtAuthGuard } from '../auth-guard/jwt.auth.guard';
import { ObjectValidationPipe } from 'src/util/object-vilidator/object-validator.pipe';
import { authSchema } from '../model/auth.model';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UsePipes(new ObjectValidationPipe(authSchema))
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('user')
  getBook(@Request() req: any) {
    return req.user;
  }
}
