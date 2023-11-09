import {IIngredientModel} from "@domain/ingredient/types";

export interface IQuantity {
  value: number
  unit: string
}

export interface IIngredientsWithQuantity extends Partial<IIngredientModel> {
  id: string;
  quantity: IQuantity;
}

export type MealCreateBody = Omit<IMeal, 'id'>

export interface IMealModel {
  id: string;
  name: string;
}

export interface IMeal extends IMealModel {
  ingredients: Array<IIngredientsWithQuantity>
}