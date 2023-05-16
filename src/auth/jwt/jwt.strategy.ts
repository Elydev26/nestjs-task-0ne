/* eslint-disable prettier/prettier */
import { ConflictException, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt'
import { User } from 'src/user/model/user.model';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../../user/service/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly usersService: UsersService,
    private configSecret: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configSecret.get('Jwt_Secret')
    });
  }

  async validate(payload: { email: string }): Promise<User> {
    const { email } = payload;  
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new ConflictException('Invalid token');
    }
    return user;
  }
}
