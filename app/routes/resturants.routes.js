import express from 'express';
import * as resturantsController from '../controllers/resturants.controllers.js'
import { getRoleByUserId } from '../middleware/getRoleByUserId.js';
import { isAdmin } from '../middleware/isAdmin.js';
import { isManager } from '../middleware/isManager.js';
import { joiValidator } from '../middleware/joiValidator.js';
import { createResturantSchema, updateResturantSchema } from '../services/validations/schemas/resturant.validations.js';

const resturantsRouter = express.Router();

resturantsRouter.get('/', getRoleByUserId, resturantsController.getResturants);

resturantsRouter.post('/', getRoleByUserId, isAdmin, joiValidator(createResturantSchema),resturantsController.createResturant);

resturantsRouter.put('/:resturantId', getRoleByUserId, isManager, joiValidator(updateResturantSchema), resturantsController.updateResturant);

resturantsRouter.delete('/:resturantId', getRoleByUserId, isAdmin, resturantsController.deactivateResturant);

resturantsRouter.get('/:resturantId', getRoleByUserId, resturantsController.getResturantById);

export default resturantsRouter;
