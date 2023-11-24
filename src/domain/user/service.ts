import {UserRepository} from "./repository";
import {IUserModel} from "./types";

export class UserService {
  
  constructor(private repo: UserRepository) {}

  async login({username, password}: IUserModel) {
    const user = await this.repo.findUserByUsername(username);

    if (!user) {
      throw new Error('User not found');
    }

    const isPasswordMatch = Bun.password.verifySync(password, user.password);

    return isPasswordMatch;
  }

  async create({username, password}: IUserModel) {
    const existingUser = await this.repo.findUserByUsername(username);

    if (existingUser) {
      throw new Error('User already exists');
    }

    // validate
    const hashed = Bun.password.hashSync(password);

    return this.repo.create(username, hashed);
  }
}