import {IIngredient} from "@domain/ingredient/types";

export interface IQuantity {
  value: number
  unit: string
}

export interface IIngredientsWithQuantity {
  quantity: IQuantity
  ingredientId: string
}

export interface IMeal {
  id: string;
  name: string;
  ingredients: IIngredientsWithQuantity[]
}