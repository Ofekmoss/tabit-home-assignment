import BadRequestError from "../errors/badRequest.error.js";

export const joiValidator = (schema) => {
    return async (req, res, next) => {
        try {
            const { error } = schema.validate(req.body);
            if (error) {
                throw new BadRequestError({message:'Request body not match vaildation'});
            }
            next()
        
        } catch(err) {
            next(err);
        }
    }
} 