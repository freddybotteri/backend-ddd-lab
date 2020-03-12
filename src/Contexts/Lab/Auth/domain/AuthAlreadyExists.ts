export default class AuthAlreadyExists extends Error {
  constructor(authId: string) {
    super(`auth ${authId} already exists`);
  }
}
