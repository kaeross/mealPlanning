import {randomUUID} from "crypto";
import {Ingredient} from "../ingredient/ingredient";

export const mealStore: Meal[] = [];

export interface IQuantity {
  value: number
  unit: string
}

export interface IIngredientsWithQuantity {
  quantity: IQuantity
  ingredient: Ingredient
}

export class Meal {
  constructor(public name: string, public ingredients: IIngredientsWithQuantity[], public id: string) {}

  listIngredients(): IIngredientsWithQuantity[] {
    return this.ingredients;
  }

  addIngredient(ingredient: Ingredient, quantity: IQuantity) {
    this.ingredients.push({quantity, ingredient})
  }

  static create(name: string, ingredients: IIngredientsWithQuantity[] = []) {
    const id = randomUUID();
    return new Meal(name, ingredients, id);
  }

  save() {
    mealStore.push(this)
  }

  stringify() {
    return {
      id: this.id,
      name: this.name,
      ingredients: this.ingredients.map(({ingredient, quantity}) => ({
        quantity,
        ingredient: ingredient.stringify()
      }))
    }
  }
}