import {MealService} from "@domain/meal/service";
import {IIngredientsWithQuantity, IMeal, IMealModel, MealCreateBody} from "@domain/meal/types";
import {AbstractInterface} from "./abstractInterface";

export class MealInterface extends AbstractInterface<IMealModel, IMeal, MealCreateBody> {
  constructor(service: MealService) {
    super(service)
  }

  async create({name, ingredients}: MealCreateBody) {
    const emptyArray: IIngredientsWithQuantity[] = []
    return this.service.create({name, ingredients: ingredients ?? emptyArray})
  }
}
