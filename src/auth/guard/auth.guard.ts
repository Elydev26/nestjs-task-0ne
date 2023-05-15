/* eslint-disable prettier/prettier */
// import {
//   Injectable,
//   CanActivate,
//   ExecutionContext,
//   BadGatewayException,
// } from '@nestjs/common';
// import { Request } from 'express'
// import { JwtService } from '@nestjs/jwt';
// import { ExtractJwt } from 'passport-jwt';

// @Injectable()
// export class AuthsGuard implements CanActivate {
//   constructor(private readonly jwtService: JwtService) {}
//   canActivate(context: ExecutionContext): Promise<boolean> {
//     const request = context.switchToHttp().getRequest();
//     return vali

//     if (userEmailExist)
//       throw new BadGatewayException(
//         `user with these ${value.email} already exist, pls input a new email to proceed`,
//       );
//     return true;
//   }
// }
import { CanActivate, Injectable, ExecutionContext } from '@nestjs/common';

@Injectable()
export class AuthsGuard implements CanActivate {
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    
        return request.isAuthenticated()
  }
}

