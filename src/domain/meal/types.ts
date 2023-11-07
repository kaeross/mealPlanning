import {IIngredient} from "@domain/ingredient/types";

export interface IQuantity {
  value: number
  unit: string
}

export interface IIngredientsWithQuantity {
  quantity: IQuantity
  ingredientId: string
}

export interface IMealModel {
  id: string;
  name: string;
}

export interface IMeal extends IMealModel {
  ingredients: Array<IIngredientsWithQuantity>
}