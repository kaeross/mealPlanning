import {Service} from "@domain/abstractService";
import {IngredientRepository} from "./repository";
import {IIngredientModel, IngredientCreateBody} from "./types";

export class IngredientService extends Service<IIngredientModel, IIngredientModel, IngredientCreateBody> {
  constructor(repository: IngredientRepository) {
    super(repository)
  }
}