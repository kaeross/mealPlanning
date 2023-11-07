import {IngredientService} from "@domain/ingredient/service";
import {IIngredient} from "@domain/ingredient/types";

export class IngredientInterface {
  constructor(private service: IngredientService) {}

  list() {
    return this.service.list()
  }

  async create(ingredient: Omit<IIngredient, 'id'>) {
    return this.service.create(ingredient)
  }
}
