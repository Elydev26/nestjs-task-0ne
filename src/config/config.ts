/* eslint-disable prettier/prettier */
import { registerAs } from "@nestjs/config";

export const config = registerAs('database', ()=>({
     mongoDB_Uri: process.env.MONGODB_URI || 'mongodb+srv://adewunmi:ELYDEV@auth.xzfasts.mongodb.net/?retryWrites=true&w=majority',
  Jwt_Secret: process.env.JWT_SECRET,
  port: process.env.PORT || 8080

   }))

