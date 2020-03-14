import AuthRepository from '../domain/AuthRepository';
import Auth from '../domain/Auth';

export default class AuthCommandCreator {
  private repository: AuthRepository;

  constructor(repository: AuthRepository) {
    this.repository = repository;
  }

  async run(name: string, email: string,password: string): Promise<void> {
    const auth = new Auth(name, email,password);

    return this.repository.save(auth);
  }
}