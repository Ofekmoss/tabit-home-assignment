import joi from 'joi';
import joiDate from '@hapi/joi-date';
import { tabitConstants } from '../../constants/tabit.strings.js';
import joiObjectid from 'joi-objectid';


const Joi = joi.extend(joiDate);
Joi.objectId = joiObjectid(Joi);

const regex = {
    name: /^[ A-Zא-תa-z'.\-`]{2,40}$/
};


export const strings = (required = false) => (required ? Joi.string().required() : Joi.string().allow(null).allow(''));
export const booleans = (required = false) => (required ? Joi.boolean().required() : Joi.boolean().allow(null).allow(false));

export const validateName = (required = false) => strings(required).regex(regex.name);
export const validateRole = (required = false) => strings(required).valid(tabitConstants.ADMIN, tabitConstants.MANAGER, tabitConstants.WAITER);
export const validateObjectId = () => Joi.objectId();
export const validateBoolean = (required = false) => booleans(required);

export const baseValidationSchema = Joi.object({
});


