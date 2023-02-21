import ForbiddenError from "../errors/forbidden.error.js";
import UnauthorizedError from "../errors/unauthorized.error.js";
import User from "../models/user.model.mjs";

export const getRoleByUserId = async (req, res, next) => {
    try {
        const userId = req.get('UserId');
        if (!userId) {
            throw new UnauthorizedError({message:'Missing user id'});;
        }
        const user = await User.findById(userId);
        if (!user) {
            throw new ForbiddenError({ message: `User with id:${userId} could not be found` });;
        }
        req.user = user;
        req.role = user.role;
        next();
    }
    catch (err) {
        next(err);
    }
}
 