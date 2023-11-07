import {IngredientRepository} from "./repository";
import {IIngredient} from "./types";

export class IngredientService {
  constructor(private repository: IngredientRepository) {}
  async list() {
    return this.repository.findMany()
  }

  async create(ingredient: Omit<IIngredient, 'id'>) {
    return this.repository.create(ingredient);
  }
}