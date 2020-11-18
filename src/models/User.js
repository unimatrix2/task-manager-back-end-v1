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
        // Importando o modelo do mongoose na classe
        this.User = model('User', userSchema);

        // Delcarações das regras
        this.fullName = joi.string().min(5).max(100).required();
        this.email = joi.string().email().min(5).max(100)
            .required();
        this.password = joi.string().min(5).max(100).required();
        this.imageURL = joi.string().min(5).max(200);

        // Forçando o escopo da classe no this das funções
        this.validateSignupParams = this.validateSignupParams.bind(this);
        this.validateLoginParams = this.validateLoginParams.bind(this);
    }

    validateSignupParams(req, res, next) {
        // Declarar regras de validação
        // Precisa ser um objeto (joi.object) e cada prop dele é uma regra
        // que foi definida no constructor
        const signupUserSchema = joi.object({
            fullName: this.fullName,
            email: this.email,
            password: this.password,
            imageURL: this.imageURL,
        }).options({ abortEarly: false });
        // Com essa option ele não para na primeira ocorrência de erro

        // Guardando o retorno da validação em uma variável
        const joiValidation = signupUserSchema.validate(req.body);

        if (joiValidation.error) {
            // Aqui o reduce agrega em um objeto o label de cada erro
            const errorObject = joiValidation.error.details.reduce((acc, error) => {
                acc[error.context.label] = error.message;

                return acc;
            }, {});

            throw new ApplicationError({ message: errorObject, type: 'Auth-Signup-Validation-Error', status: 400 });
        }

        return next();
    }

    // eslint-disable-next-line no-unused-vars
    validateLoginParams(req, res, next) {
        const loginUserSchema = joi.object({
            email: this.email,
            password: this.password,
        });

        const joiValidation = loginUserSchema.validate(req.body);

        // eslint-disable-next-line no-console
        console.log(joiValidation.error.details);
    }
}

export default new UserEntity();
