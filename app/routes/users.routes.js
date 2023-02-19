import express from 'express';
import * as usersController from '../controllers/users.controllers.js'
import { isAdmin } from '../middleware/isAdmin.js';

const usersRouter = express.Router();

usersRouter.get('/', isAdmin, usersController.getUsers);

usersRouter.post('/', isAdmin, usersController.createUser);

export default usersRouter;
