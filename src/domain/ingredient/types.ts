export interface IIngredientModel {
  id: string;
  name: string;
}

export type IngredientCreateBody = Omit<IIngredientModel, 'id'>