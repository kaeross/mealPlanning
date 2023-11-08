import {MealRepository} from "./repository";
import {MealCreateBody} from "./types";

export class MealService {
  constructor(private repository: MealRepository) {}
  list(ids?: string[]) {
    return this.repository.findMany(ids)
  }

  create(meal: MealCreateBody) {
    return this.repository.create(meal);
  }
}