import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { BooksModule } from './books/books.module';
import { config } from './config/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    BooksModule,
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configUri: ConfigService) => ({
        uri: configUri.get<string>(
          ' mongoDB_Uri',
          'mongodb+srv://adewunmi:ELYDEV@auth.xzfasts.mongodb.net/?retryWrites=true&w=majority',
        ),
      }),
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    AuthModule,
    UserModule,
  ],

  // controllers: [UsersController, AuthController],
  // providers: [UsersService, AuthService, JwtStrategy],
})
export class AppModule {}
