import Auth from './Auth';
import { Nullable } from '../../../Shared/domain/Nullable';

export default interface AuthRepository {
  save(auth: Auth): Promise<void>;

  findAll(id: string): Promise<any>;

  signin(email: string,password: string): Promise<Nullable<Auth>>;
}
