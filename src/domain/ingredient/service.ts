import {Service} from "@domain/service";
import {IngredientRepository} from "./repository";
import {IIngredientModel, IngredientCreateBody} from "./types";

export class IngredientService extends Service<IIngredientModel, IIngredientModel, IngredientCreateBody> {
  constructor(repository: IngredientRepository) {
    super(repository)
  }
}