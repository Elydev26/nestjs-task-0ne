/* eslint-disable prettier/prettier */
import * as Joi from 'joi';

export const authSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
 });