import { Router } from 'express';
import ClassesController from './controllers/ClassController';
import ConnectionController from './controllers/ConnectionsController';
import TodoController from './controllers/TodoController';

const classesController = new ClassesController;
const connectionController = new ConnectionController;
const todoController = new TodoController;

const routes = Router();

import multer from 'multer';
import multerConfig from './config/multer';
const upload = multer(multerConfig);

routes.post('/todo', upload.single('media'),todoController.create);

routes.post('/classes', classesController.create);
routes.get('/classes', classesController.index);

routes.post('/connections', connectionController.create);
routes.get('/connections', connectionController.index);
export default routes;
