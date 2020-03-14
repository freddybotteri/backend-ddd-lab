import { Request, Response } from 'express';
import AuthCommandCreator from '../../../Contexts/Lab/Auth/application/AuthCommandCreator';
import httpStatus from 'http-status';
import Controller from './Controller';
import AuthAlreadyExists from '../../../Contexts/Lab/Auth/domain/AuthAlreadyExists';

export class AuthPutController implements Controller {
  constructor(private authCommandCreator: AuthCommandCreator) {}

  async run(req: Request, res: Response) {
    const name: string = req.body.name;
    const email: string = req.body.email;
    const password: string = req.body.password;
    let response: string =  '';
    console.log(req.body);
    try {
      response = await this.authCommandCreator.run(name, email,password);
    } catch (e) {
      if (e instanceof AuthAlreadyExists) {
        res.status(httpStatus.BAD_REQUEST).json({ auth: false, token });
      } else {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ auth: false, token });
      }
    }

    res.status(httpStatus.CREATED).json(response);
  }
}
