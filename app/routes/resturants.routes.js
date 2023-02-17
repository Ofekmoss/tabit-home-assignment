import express from 'express';
import * as resturantsController from '../controllers/resturants.controllers.js'

const resturantsRouter = express.Router();

resturantsRouter.get('/', resturantsController.getResturants);

resturantsRouter.post('/', resturantsController.createResturant);

resturantsRouter.put('/:resturantId', resturantsController.updateResturant);

resturantsRouter.delete('/:resturantId', resturantsController.deactivateResturant);

resturantsRouter.get('/:resturantId', resturantsController.getResturantById);

export default resturantsRouter;
