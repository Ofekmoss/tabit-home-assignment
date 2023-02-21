import { tabitConstants } from "../constants/tabit.strings.js";
import ForbiddenError from "../errors/forbidden.error.js";

export const isManager = async (req, res, next) => {
    try {
        if (req.role !== tabitConstants.MANAGER && req.role !== tabitConstants.ADMIN) {
            throw new ForbiddenError({message:'No Permission'});
        }
        next();
    
    } catch(err) {
        next(err);
    }
}