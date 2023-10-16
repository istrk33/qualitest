import * as Joi from '@hapi/joi';

export const configValidationSchema = Joi.object({
  DB_HOST: Joi.string().required(),
  DB_PORT: Joi.number().default(5431).required(),
  DB_USERNAME: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  DB_DATABASE: Joi.string().required(),

  PGADMIN_DEFAULT_EMAIL: Joi.string().required(),
  PGADMIN_DEFAULT_PASSWORD: Joi.string().required(),
  PGADMIN_LISTEN_PORT: Joi.number().default(5431).required(),

  JWT_SECRET_KEY: Joi.string().required(),
  APP_EXPIRES: Joi.number().required(),
  APP_PORT: Joi.number().required(),
});
