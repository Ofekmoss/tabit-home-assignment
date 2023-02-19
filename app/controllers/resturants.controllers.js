import { tabitConstants } from '../constants/tabit.strings.js';
import ForbiddenError from '../entities/error/400errors/forbidden.error.js';
import NotFoundError from '../entities/error/notFound.error.js';
import Resturant from '../models/resturant.model.mjs';
import {sendSuccessResponse} from '../utils/responseFormatter.utils.js';

export async function getResturants(req, res, next) {
        try {
            let resturants = []
            if (req.role === tabitConstants.ADMIN) {
                resturants = await Resturant.find();
            } else {
                const userResturant = await Resturant.findById(req.user.resturant);
                resturants = await Resturant.find({active: true, chain: (userResturant.chain) ? userResturant.chain : userResturant.name});
            }
            sendSuccessResponse({ resturants }, res, 200);
        } catch (err) {
            next(err);
        }
}

export async function getResturantById(req, res, next) {
        try {
            const resturantId = req.params.resturantId;
            const resturant = await Resturant.findOne({_id: resturantId});
            if (!resturant || !resturant.active) {
                const error = new NotFoundError({ message: 'The resturant with this id could not be found'});
                throw error;   
            }
            const userAllowedChain = (await Resturant.findById(req.user.resturant)).chain;
            if (resturant.chain !== userAllowedChain) {
                const error= new ForbiddenError({message:'No Permission.'});
                throw error;
            }            
            sendSuccessResponse({ resturant }, res, 200);
        } catch (err) {
            next(err);
        }
}

export async function createResturant(req, res, next) {
        try {
            await Resturant.create({...req.body});
            sendSuccessResponse({}, res, 201);
        } catch (err) {
            next(err);
        }
}

export async function updateResturant(req, res, next) {
        try {
            const resturantId = req.params.resturantId;
            const resturant = await Resturant.findById(resturantId);
            let userAllowedChain = await Resturant.findById(req.user.resturant);
            userAllowedChain = userAllowedChain.chain ? userAllowedChain.chain : userAllowedChain.name;
            if (req.role === tabitConstants.WAITER) {
                const error= new ForbiddenError({message:'No Permission.'});
                throw error;
            } else if (req.role === tabitConstants.MANAGER && Object.keys(req.body).includes(tabitConstants.CHAIN)) {
                const error= new ForbiddenError({message:'No Permission.'});
                throw error;
            } else if (resturant.chain !== userAllowedChain) {
                const error= new ForbiddenError({message:'No Permission.'});
                throw error;
            } 
            await Resturant.findByIdAndUpdate(resturantId,{...req.body});
            sendSuccessResponse({ }, res, 201);
        } catch (err) {
            next(err);
        }
}

export async function deactivateResturant(req, res, next) {
        try {
            const resturantId = req.params.resturantId;
            await Resturant.findByIdAndUpdate(resturantId,{active: false});
            sendSuccessResponse({ }, res, 201);
        } catch (err) {
            next(err);
        }
}