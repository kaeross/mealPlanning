import {MealRepository} from "./repository";
import {IMeal} from "./types";

export class MealService {
  constructor(private repository: MealRepository) {}
  list() {
    return this.repository.findMany()
  }

  create(meal: Omit<IMeal, 'id'>) {
    return this.repository.create(meal);
  }
}