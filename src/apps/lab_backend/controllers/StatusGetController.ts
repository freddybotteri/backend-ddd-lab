import { Request, Response } from 'express';
import httpStatus from 'http-status';
import Controller from './Controller';
import AuthQueryFinder from '../../../Contexts/Lab/Auth/application/AuthQueryFinder';

export default class StatusGetController implements Controller {
	
		constructor(private authQueryFinder: AuthQueryFinder) {}
		async run(req: Request, res: Response) {
				let response: string =  '';
				try {

					response = await this.authQueryFinder.run();    
				} catch (e) {
					res.status(httpStatus.INTERNAL_SERVER_ERROR).json(e);
				}
				res.status(httpStatus.OK).jsonp(response);
			}

		async signin(req: Request, res: Response) {

				const email: string = req.params.email;
				const password: string = req.params.password;
				let response: string =  '';
				try {
					response = await this.authQueryFinder.signin(email,password);   
				} catch (e) {
					
					res.status(httpStatus.INTERNAL_SERVER_ERROR).json(e);
				}
				res.status(httpStatus.OK).jsonp(response);
			}
}
