import express from 'express';
import * as usersController from '../controllers/users.controllers.js'
import { getRoleByUserId } from '../middleware/getRoleByUserId.js';
import { isAdmin } from '../middleware/isAdmin.js';

const usersRouter = express.Router();

usersRouter.get('/', getRoleByUserId ,isAdmin, usersController.getUsers);

usersRouter.post('/', getRoleByUserId ,isAdmin, usersController.createUser);

export default usersRouter;
