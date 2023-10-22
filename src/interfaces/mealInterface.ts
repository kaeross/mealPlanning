import {MealService} from "@domain/meal/service";
import {IMeal} from "@domain/meal/types";

export class MealInterface {
  constructor(private service: MealService) {}

  list() {
    return this.service.list()
  }

  create(meal: Omit<IMeal, 'id'>) {
    return this.service.create(meal)
  }
}
