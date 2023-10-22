import {IngredientRepository} from "./repository";
import {IIngredient} from "./types";

export class IngredientService {
  constructor(private repository: IngredientRepository) {}
  list() {
    return this.repository.findMany()
  }

  create(ingredient: Omit<IIngredient, 'id'>) {
    return this.repository.create(ingredient);
  }
}