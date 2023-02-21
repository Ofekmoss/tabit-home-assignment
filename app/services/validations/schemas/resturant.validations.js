import {
    validateName,
    validateBoolean,
    baseValidationSchema,
} from '../fields.validations.js';

export const createResturantSchema = baseValidationSchema.keys({
    name: validateName(true),
    chain: validateName(false),
    country: validateName(false),
    active: validateBoolean(true),
});

export const updateResturantSchema = baseValidationSchema.keys({
    name: validateName(false),
    chain: validateName(false),
    country: validateName(false)
});

