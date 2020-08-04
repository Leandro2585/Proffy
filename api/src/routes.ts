import { Router } from 'express';
import ClassesController from './controllers/ClassController';
import ConnectionController from './controllers/ConnectionsController';
const routes = Router();

const classesController = new ClassesController;
const connectionController = new ConnectionController;
routes.post('/classes', classesController.create);
routes.get('/classes', classesController.index);

routes.post('/connections', connectionController.create);
routes.get('/connections', connectionController.index);
export default routes;