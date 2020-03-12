import { Express } from 'express';
import container from '../config/dependency-injection';
import verifyToken from '../middleware/verifyToken';
import StatusController from '../controllers/StatusGetController';

export const register = (app: Express) => {
  const controller: StatusController = container.get('Apps.Lab_backend.controllers.StatusGetController');
  app.get('/usuarios',verifyToken, controller.run.bind(controller));
  app.get('/signin/:email/:password', controller.signin.bind(controller));
};
