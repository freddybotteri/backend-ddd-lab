import { Express } from 'express';
import container from '../config/dependency-injection';
import {AuthPutController} from '../controllers/AuthPutController';

export const register = (app: Express) => {
  const controller: AuthPutController = container.get('Apps.Lab_backend.controllers.AuthPutController');
  app.post('/add/auth', controller.run.bind(controller));
};
