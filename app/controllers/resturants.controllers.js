import { StatusCodes } from 'http-status-codes';
import { tabitConstants } from '../constants/tabit.strings.js';
import ForbiddenError from '../errors/forbidden.error.js';
import NotFoundError from '../errors/notFound.error.js';
import Resturant from '../models/resturant.model.mjs';
import User from '../models/user.model.mjs';
import {sendSuccessResponse} from '../utils/responseFormatter.utils.js';

function removeArrayDuplicates(array) {
    return array.reduce((unique, item) => {
        if (!unique.find((obj) => obj.id === item.id)) {
          unique.push(item);
        }
        return unique;
    }, []);
}

async function getAllowedResturants(user) {
    try {
        let resturants = [];
        if (user.role === tabitConstants.ADMIN) {
            resturants = await Resturant.find({}, "-__v");
        } else {
            const sameUsers = await User.find({name: user.name});

            for (const user of sameUsers) {
                const userResturant = await Resturant.findById(user.resturant);            
                const resturantsList = await Resturant.find({
                    active: true, 
                    $or: [
                        {name: (userResturant.chain) ? userResturant.chain : userResturant.name},
                        {chain: (userResturant.chain) ? userResturant.chain : userResturant.name}
                    ]
                }, "-__v");
                
                resturants.push(...resturantsList);
            };
        }
        return removeArrayDuplicates(resturants);
    } catch (err) {
        throw err;
    }
}

export async function getResturants(req, res, next) {
        try {
            let resturants = []
            if (req.role === tabitConstants.ADMIN) {
                resturants = await Resturant.find({}, "-__v");
            } else {
                resturants = await getAllowedResturants(req.user);
            }
            sendSuccessResponse({ resturants }, res);
        } catch (err) {
            next(err);
        }
}

export async function getResturantById(req, res, next) {
        try {
            const resturantId = req.params.resturantId;
            const resturant = await Resturant.findOne({_id: resturantId}, "-__v");
            if (!resturant || !resturant.active) {
                throw new NotFoundError({ message: `Resturant with id:${resturantId} could not be found`});
            }
            if(req.role !== tabitConstants.ADMIN && !resturant.active){
                throw new NotFoundError({ message: `Resturant with id:${resturantId} could not be found`});
            }
            const allowedResturants = await getAllowedResturants(req.user);
            if (!allowedResturants.some(item => item.id === resturant.id)) {
                throw new ForbiddenError({message:'Not allowed to get resturant'});
            }            
            sendSuccessResponse({ resturant }, res);
        } catch (err) {
            next(err);
        }
}

export async function createResturant(req, res, next) {
        try {
            await Resturant.create({...req.body});
            sendSuccessResponse({}, res, StatusCodes.CREATED);
        } catch (err) {
            next(err);
        }
}

export async function updateResturant(req, res, next) {
        try {
            const resturantId = req.params.resturantId;
            const resturant = await Resturant.findById(resturantId);
            const allowedResturants = await getAllowedResturants(req.user);
            
            if (!allowedResturants.some(item => item.id === resturant.id)) {
                throw new ForbiddenError({message:'Not allowed to update resturant'});
            }

            if (req.role === tabitConstants.MANAGER && Object.keys(req.body).includes(tabitConstants.CHAIN)) {
                throw new ForbiddenError({message:'No permission to update resturant chain'});
            }

            await Resturant.findByIdAndUpdate(resturantId,{...req.body});
            sendSuccessResponse({ }, res);
        } catch (err) {
            next(err);
        }
}

export async function deactivateResturant(req, res, next) {
        try {
            const resturantId = req.params.resturantId;
            const resturant = await Resturant.findByIdAndUpdate(resturantId,{active: false});
            if (!resturant) {
                throw new NotFoundError({message:`Resturant id:${resturantId} could not be found`})
            }
            sendSuccessResponse({ }, res);
        } catch (err) {
            next(err);
        }
}