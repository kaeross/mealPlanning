
import {ingredientsStore} from "@domain/ingredient/ingredient";
import {IQuantity, Meal} from "@domain/meal/meal";
import {Context} from "elysia";

interface ICreateIngredientWithQuantity {
  quantity: IQuantity
  ingredientId: string
}

export const createMealHandler = (context: Context<{body: {name: string, ingredients?: ICreateIngredientWithQuantity[] = []}}>) => {
  const {name} = context.body;

  const meal = Meal.create(name);

  meal.save();

  return {
    created: meal.stringify()
  }
}