import { tabitConstants } from "../constants/tabit.strings.js";
import ForbiddenError from "../entities/error/400errors/forbidden.error.js";
import UnauthorizedError from "../entities/error/400errors/unauthorized.error.js";
import NotFoundError from "../entities/error/notFound.error.js";
import User from "../models/user.model.mjs";

export const isAdmin = async (req, res, next) => {
    try {
        const userIdHeader = req.get('UserId');
        if (!userIdHeader) {
            const error= new UnauthorizedError({message:'Not Authenticated.'});
            throw error;
        }
        const user = await User.findById(userIdHeader);
        if (!user) {
            const error = new NotFoundError({ message: 'The user with this id could not be found' });
            throw error;
        }
        if (user.role !== tabitConstants.ADMIN) {
            const error= new ForbiddenError({message:'No Permission.'});
            throw error;
        }
        next();
    
    } catch(err) {
        next(err);
    }
}