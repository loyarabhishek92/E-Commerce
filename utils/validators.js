import val from 'express-joi-validation';
import joi from 'joi';

export const validator = val.createValidator({});


export const registerSchema = joi.object({
    username: joi.string().min(5).required(),
    email: joi.string().email().required(),
    password: joi.string().min(5).required(),
});


export const loginSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(5).required(),
});