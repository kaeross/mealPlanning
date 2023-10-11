import {ingredientsStore} from "@domain/ingredient/ingredient";

export const listIngredientHandler = () => {
  return ingredientsStore.map((ingredient) => ingredient.stringify());
}