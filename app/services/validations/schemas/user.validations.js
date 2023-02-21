import {
    validateName,
    baseValidationSchema,
    validateRole,
    validateObjectId,
} from '../fields.validations.js';

export const createUserSchema = baseValidationSchema.keys({
    name: validateName(true),
    role: validateRole(true),
    resturant: validateObjectId(),
});
