import {Ingredient} from "@domain/ingredient/ingredient";
import {Context} from "elysia";

export const createIngredientHandler = (context: Context<{body: {name: string}}>) => {
  const {name} = context.body;

  const ingredient = Ingredient.create(name);

  ingredient.save();

  return {
    created: ingredient.stringify()
  }
}