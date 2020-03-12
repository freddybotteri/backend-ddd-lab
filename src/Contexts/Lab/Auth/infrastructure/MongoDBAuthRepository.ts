import AuthRepository from '../domain/AuthRepository';
import Auth from '../domain/Auth';
import { Nullable } from '../../../Shared/domain/Nullable';

import AuthSchema  from '../../../../apps/lab_backend/database/models/AuthSchema';
import verifyToken from '../../../../apps/lab_backend/middleware/verifyToken';
import jwt from 'jsonwebtoken';

export default class MongoDBAuthRepository implements AuthRepository {

	async save(auth: Auth): Promise<void> {

		try {
			const authSchema = new AuthSchema(auth);
			authSchema.password = await authSchema.encryptPassword(auth.password);
			await authSchema.save()
			const token = jwt.sign({ id: authSchema.id },'mysecretkey', {
				expiresIn: 60 * 60 * 24 
			});
			return { auth: true, token };

		} catch (e) {
			return { auth: false, token: null };
		}

	}

	async findAll(): Promise<void> {
		const authAll =  await AuthSchema.find();
		return authAll;
	}

	async signin(email: string,password: string): Promise<Nullable<Auth>> {
		const user = await AuthSchema.findOne({email: email})
		
		if(!user) {
			console.log('pasa ',email,user)
				return {auth: false, token: null,msg:"The email doesn't exists"};
		}
		const validPassword = await user.comparePassword(password, user.password);
		if (!validPassword) {
				return {auth: false, token: null,msg:"Credenciales invalidas."};
		}
		const token = jwt.sign({id: user._id}, 'mysecretkey', {
				expiresIn: 60 * 60 * 24
		});
		return {auth: true, token};
		;
	}
}

