/* eslint-disable prettier/prettier */
import * as Joi from 'joi';
export const bookSchema = Joi.object({
  title: Joi.string().required(),
  author: Joi.string().required(),
  decription: Joi.string().email().required(),
  publishedYear: Joi.string().required(),
});
