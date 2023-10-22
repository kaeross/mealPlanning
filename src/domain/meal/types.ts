import {IIngredient} from "@domain/ingredient/types";

export interface IQuantity {
  value: number
  unit: string
}

export interface IIngredientsWithQuantity {
  quantity: IQuantity
  ingredient: IIngredient
}

export interface IMeal {
  id: string;
  name: string;
}