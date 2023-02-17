import express from 'express';
import * as usersController from '../controllers/users.controllers.js'

const usersRouter = express.Router();

usersRouter.get('/', usersController.getUsers);

usersRouter.post('/', usersController.createUser);

export default usersRouter;
