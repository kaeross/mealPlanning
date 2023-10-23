import {MealService} from "@domain/meal/service";
import {IMeal} from "@domain/meal/types";

export class MealInterface {
  constructor(private service: MealService) {}

  list() {
    return this.service.list()
  }

  create({name, ingredients}: Pick<IMeal, 'name'> & Partial<Pick<IMeal, 'ingredients'>>) {
    return this.service.create({name, ingredients: ingredients ?? []})
  }
}
