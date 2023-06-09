/* eslint-disable prettier/prettier */

import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginDto {
    
    @IsNotEmpty()
    username: string;
    
    @IsEmail()
    email: string;

    @IsNotEmpty()
    password: string;
}
