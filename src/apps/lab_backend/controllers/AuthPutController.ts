import { Request, Response } from 'express';
import AuthCommand from '../../../Contexts/Lab/Auth/application/AuthCommand';
import httpStatus from 'http-status';
import Controller from './Controller';
import AuthAlreadyExists from '../../../Contexts/Lab/Auth/domain/AuthAlreadyExists';

export class AuthPutController implements Controller {
  constructor(private authCommand: AuthCommand) {}

  async run(req: Request, res: Response) {
    const name: string = req.body.name;
    const email: string = req.body.email;
    const password: string = req.body.password;
    let response: string =  '';
    console.log(req.body);
    try {
      response = await this.authCommand.run(name, email,password);
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
