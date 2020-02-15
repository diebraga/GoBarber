// import controllers
// import midleware authentication

import { Router } from 'express';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/users', UserController.store); // creation user
routes.post('/sessions', SessionController.store); // create session

routes.use(authMiddleware); // middlewares for validatioin

routes.put('/users', UserController.update); // update user

export default routes;
