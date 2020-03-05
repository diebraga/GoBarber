// import controllers
// import midleware authentication

import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';
import ProviderController from './app/controllers/ProviderController';
import AppointmentController from './app/controllers/AppointmentController';
import BookController from './app/controllers/BookController';
import NotificationController from './app/controllers/NotificationController';
import AvalibilityController from './app/controllers/AvalibilityController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/users', UserController.store); // creation user
routes.post('/sessions', SessionController.store); // create session

routes.use(authMiddleware); // middlewares for validatioin

routes.put('/users', UserController.update); // update user

routes.get('/appointments', AppointmentController.index); // list appointments
routes.post('/appointments', AppointmentController.store); // book appointmert
routes.delete('/appointments/:id', AppointmentController.delete); // cancel appointment

routes.get('/booklist', BookController.index);

routes.get('/notifications', NotificationController.index); // list notifications
routes.put('/notifications/:id', NotificationController.update); // mark not as read

routes.get('/providers', ProviderController.index); // list providers
routes.get('/providers/:providerId/avalibility', AvalibilityController.index);

routes.post('/files', upload.single('file'), FileController.store);

export default routes;
