import {Ingredient} from "@domain/ingredient";
import {Context} from "elysia";

export const createIngredientHandler = (context: Context) => {
  if (!context.body || !Object.hasOwn(context.body, 'name')) {
    throw new Error('Invalid body');
  }

  const {name} = context.body as {name: string};

  const ingredient = Ingredient.create(name);

  ingredient.save();

  return {
    created: ingredient.stringify()
  }
}