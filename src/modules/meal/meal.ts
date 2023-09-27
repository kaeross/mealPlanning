import {Ingredient} from "../ingredient/ingredient";

interface IQuantity {
    value: number
    unit: string
  }

interface IIngredientsWithQuantity {
  quantity: IQuantity
  ingredient: Ingredient
}

export class Meal {
  constructor(public name: string, public ingredients: IIngredientsWithQuantity[]) {}

  listIngredients(): IIngredientsWithQuantity[] {
    return this.ingredients;
  }

  addIngredient(ingredient: Ingredient, quantity: IQuantity) {
    this.ingredients.push({quantity, ingredient})
  }

  static create(name: string, ingredients: IIngredientsWithQuantity[] = []) {
    return new Meal(name, ingredients);
  } 
}