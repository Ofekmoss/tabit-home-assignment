import { tabitConstants } from '../constants/tabit.strings.js';
import NotFoundError from '../entities/error/notFound.error.js';
import Resturant from '../models/resturant.model.mjs';
import User from '../models/user.model.mjs';
import {sendSuccessResponse} from '../utils/responseFormatter.utils.js';

export async function getUsers(req, res, next) {
        try {
            const users = await User.find();
            sendSuccessResponse({ users }, res, 200);
        } catch (err) {
            next(err);
        }
}

export async function createUser(req, res, next) {
        try {
            const resturant = await Resturant.findById(req.body.resturant);
            if (resturant || req.body.role === tabitConstants.ADMIN) {
                await User.create({...req.body});
            } else {
                const error = new NotFoundError({ message: 'The Resturant with this id could not be found'});
                throw error;
            }
            sendSuccessResponse({  }, res, 201);
        } catch (err) {
            next(err);
        }
}