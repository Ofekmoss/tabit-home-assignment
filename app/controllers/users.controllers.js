import { StatusCodes } from 'http-status-codes';
import { tabitConstants } from '../constants/tabit.strings.js';
import NotFoundError from '../errors/notFound.error.js';
import Resturant from '../models/resturant.model.mjs';
import User from '../models/user.model.mjs';
import {sendSuccessResponse} from '../utils/responseFormatter.utils.js';

export async function getUsers(req, res, next) {
        try {
            const users = await User.find({}, "-__v");
            sendSuccessResponse({ users }, res);
        } catch (err) {
            next(err);
        }
}

export async function createUser(req, res, next) {
        try {
            const resturant = await Resturant.findById(req.body.resturant);
            if (!resturant && req.body.role !== tabitConstants.ADMIN) {
                throw new NotFoundError({ message: `Resturant with id:${req.body.resturant} could not be found`});
            } 
            await User.create({...req.body});
            sendSuccessResponse({  }, res, StatusCodes.CREATED);
        } catch (err) {
            next(err);
        }
}