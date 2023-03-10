import express from 'express';
import * as usersController from '../controllers/users.controllers.js'
import { getRoleByUserId } from '../middleware/getRoleByUserId.js';
import { isAdmin } from '../middleware/isAdmin.js';
import { joiValidator } from '../middleware/joiValidator.js';
import { createUserSchema } from '../services/validations/schemas/user.validations.js';

const usersRouter = express.Router();

usersRouter.get('/', getRoleByUserId ,isAdmin, usersController.getUsers);

usersRouter.post('/', getRoleByUserId ,isAdmin, joiValidator(createUserSchema), usersController.createUser);

export default usersRouter;
