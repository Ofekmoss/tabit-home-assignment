import UnauthorizedError from "../entities/error/400errors/unauthorized.error.js";
import NotFoundError from "../entities/error/notFound.error.js";
import User from "../models/user.model.mjs";

export const getRoleByUserId = async (req, res, next) => {
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
        req.user = user;
        req.role = user.role;
        next();
    }
    catch (err) {
        next(err);
    }
}
 