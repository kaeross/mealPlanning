import {IngredientService} from "@domain/ingredient/service";
import {IIngredient} from "@domain/ingredient/types";

export class IngredientInterface {
  constructor(private service: IngredientService) {}

  list(ids?: string[]) {
    return this.service.list(ids)
  }

  async create(ingredient: Omit<IIngredient, 'id'>) {
    return this.service.create(ingredient)
  }
}
