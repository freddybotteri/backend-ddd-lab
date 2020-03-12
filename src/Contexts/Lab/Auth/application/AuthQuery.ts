import AuthRepository from '../domain/AuthRepository';
import Auth from '../domain/Auth';

export default class AuthQuery {
  private repository: AuthRepository;

  constructor(repository: AuthRepository) {
    this.repository = repository;
  }

  async run(): Promise<void> {
    return this.repository.findAll();
  }
  async signin(email: string,password: string): Promise<void> {
    return this.repository.signin(email,password);
  }
}