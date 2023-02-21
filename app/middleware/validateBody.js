import ForbiddenError from "../errors/forbidden.error.js";

export const validateBody = (schema) => {
    return async (req, res, next) => {
        try {
            const { error } = schema.validate(req.body);
            if (error) {
                throw new ForbiddenError({message:'Request body not match vaildation'});
            }
            next()
        
        } catch(err) {
            next(err);
        }
    }
} 