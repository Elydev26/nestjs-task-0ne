/* eslint-disable prettier/prettier */

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { UserRoleEnum } from '../enum/user.enum';



@Schema()
export class User extends Document {
  @Prop()
  userName: string;

  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop()
  bio: string;

  @Prop({ type: String, enum: Object.values(UserRoleEnum), default: UserRoleEnum.USER})
  designation: UserRoleEnum;

  @Prop({type:Date, default: Date.now()})
  createdAt: Date;

  @Prop({ type: Date, default: Date.now() })
  updatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);



