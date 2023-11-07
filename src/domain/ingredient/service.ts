import {IngredientRepository} from "./repository";
import {IIngredient} from "./types";

export class IngredientService {
  constructor(private repository: IngredientRepository) {}
  async list(ids?: string[]) {
    return this.repository.findMany(ids)
  }

  async create(ingredient: Omit<IIngredient, 'id'>) {
    return this.repository.create(ingredient);
  }
}