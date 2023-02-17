import Resturant from '../models/resturant.model.mjs';
import {sendSuccessResponse} from '../utils/responseFormatter.utils.js';

export async function getResturants(req, res, next) {
        try {
            const resturants = await Resturant.find();
            sendSuccessResponse({ resturants }, res, 200);
        } catch (err) {
            next(err);
        }
}

export async function getResturantById(req, res, next) {
        try {
            const resturantId = req.params.resturantId;
            const resturant = await Resturant.findById(resturantId);
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