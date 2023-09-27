export class User {
  private constructor(public username: string, private password: string, lastLogin: Date) {}

  login(username: string, password: string) {
    if (this.username !== username) {
      console.log('username unverified')
      return false;
    }

    const isPasswordMatch = Bun.password.verifySync(password, this.password);

    return isPasswordMatch;
  }

  static create(username: string, password: string) {
    // validate
    const hashed = Bun.password.hashSync(password);

    return new User(username, hashed, new Date());
  }
}