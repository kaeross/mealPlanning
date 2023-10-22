import {mealStore} from "@domain/meal/meal";

export const listMealHandler = () => {
  return mealStore.map((meal) => meal.stringify());
}