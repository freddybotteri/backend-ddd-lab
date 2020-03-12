import Auth from './Auth';
import { Nullable } from '../../../Shared/domain/Nullable';

export default interface AuthRepository {
  save(auth: Auth): Promise<void>;

  search(id: string): Promise<Nullable<Auth>>;
}
