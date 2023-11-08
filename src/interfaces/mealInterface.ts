import {MealService} from "@domain/meal/service";
import {IIngredientsWithQuantity, MealCreateBody} from "@domain/meal/types";

export class MealInterface {
  constructor(private service: MealService) {}

  async list(ids?: string[]) {
    return this.service.list(ids)
  }

  async create({name, ingredients}: MealCreateBody) {
    const emptyArray: IIngredientsWithQuantity[] = []
    return this.service.create({name, ingredients: ingredients ?? emptyArray})
  }
}
