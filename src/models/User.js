import { Schema, model } from 'mongoose';
import joi from 'joi';

import ApplicationError from '../errors/ApplicationError';

const userSchema = new Schema(
  {
    fullName: {
      type: String, required: true, min: 5, max: 100,
    },
    email: {
      type: String, required: true, min: 5, max: 100,
    },
    password: {
      type: String, required: true, min: 5, max: 200,
    },
    imageURL: {
      type: String, default: 'https://www.ecp.org.br/wp-content/uploads/2017/12/default-avatar.png',
    },
  },
  {
    timestamps: true,
  },
);

class UserEntity {
  constructor() {
    this.User = model('User', userSchema);

    this.fullName = joi.string().min(5).max(100).required();
    this.email = joi.string().email().min(5).max(100)
      .required();
    this.password = joi.string().min(5).max(100).required();
    this.imageURL = joi.string().min(5).max(200);

    this.validateSignupParams = this.validateSignupParams.bind(this);
    this.validateLoginParams = this.validateLoginParams.bind(this);
  }

  validateSignupParams(req, res, next) {
    const signupUserSchema = joi.object({
      fullName: this.fullName,
      email: this.email,
      password: this.password,
      imageURL: this.imageURL,
    }).options({ abortEarly: false });

    const joiValidation = signupUserSchema.validate(req.body);

    if (joiValidation.error) {
      const errorObject = joiValidation.error.details.reduce((acc, error) => {
        acc[error.context.label] = error.message;

        return acc;
      }, {});

      throw new ApplicationError({ message: errorObject, type: 'Auth-Signup-Validation-Error', status: 400 });
    }

    return next();
  }

  validateLoginParams(req, res, next) {
    const loginUserSchema = joi.object({
      email: this.email,
      password: this.password,
    }).options({ abortEarly: false });

    const joiValidation = loginUserSchema.validate(req.body);

    if (joiValidation.error) {
      const errorObject = joiValidation.error.details.reduce((acc, error) => {
        acc[error.context.label] = error.message;

        return acc;
      }, {});

      throw new ApplicationError({ message: errorObject, type: 'Auth-Login-Validation-Error', status: 400 });
    }

    return next();
  }
}

export default new UserEntity();
