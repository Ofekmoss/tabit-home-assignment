import express from 'express';
import * as resturantsController from '../controllers/resturants.controllers.js'
import { getRoleByUserId } from '../middleware/getRoleByUserId.js';
import { isAdmin } from '../middleware/isAdmin.js';

const resturantsRouter = express.Router();

resturantsRouter.get('/', getRoleByUserId,resturantsController.getResturants);

resturantsRouter.post('/', isAdmin,resturantsController.createResturant);

resturantsRouter.put('/:resturantId', getRoleByUserId, resturantsController.updateResturant);

resturantsRouter.delete('/:resturantId', isAdmin,resturantsController.deactivateResturant);

resturantsRouter.get('/:resturantId', getRoleByUserId, resturantsController.getResturantById);

export default resturantsRouter;
