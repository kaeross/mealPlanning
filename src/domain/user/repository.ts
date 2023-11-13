import Neode, {Model} from "neode";
import {IUserModel} from "./types";
import {UserModel} from "./model";

export class UserRepository {
  protected model: Model<IUserModel>;
  
  constructor(db: Neode) {
    this.model = db.model<IUserModel>('User', UserModel);
  }

  async findUserByUsername(username: string) {
    const user = await this.model.first('username', username);

    return user.toJson()
  }

  async create(username: string, password: string) {
    const created = await this.model.create({username, password});

    return created.toJson();
  }
}