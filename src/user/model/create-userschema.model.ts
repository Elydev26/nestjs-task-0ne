/* eslint-disable prettier/prettier */
import * as Joi from 'joi';
export const userSchema = Joi.object({
  userName: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
});
