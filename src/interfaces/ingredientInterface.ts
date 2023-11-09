import {IngredientService} from "@domain/ingredient/service";
import {AbstractInterface} from "./abstractInterface";
import {IIngredientModel,IngredientCreateBody} from "@domain/ingredient/types";

export class IngredientInterface extends AbstractInterface<IIngredientModel, IIngredientModel, IngredientCreateBody>{
  constructor( service: IngredientService) {
    super(service)
  }
}
