import {UserService} from "@domain/user/service";
import {IUserModel} from "@domain/user/types";

export class UserInterface {
  constructor(private service: UserService) {}

  create(user: IUserModel) {
    return this.service.create(user)
  }

  login(user:IUserModel) {
    return this.service.login(user)
  }
}
