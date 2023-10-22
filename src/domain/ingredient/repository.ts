import {randomUUID} from "crypto";
import {IIngredient} from "./types";

export const ingredientsStore: IIngredient[] = [];

export class IngredientRepository {
  create(ingredient: Omit<IIngredient, 'id'>) {
    const id = randomUUID();
    const created = {...ingredient, id};
    ingredientsStore.push(created);
    return created;
  }

  createMany(ingredients: Omit<IIngredient, 'id'>[]) {
    return ingredients.map(this.create);
  }

  find({name, id}: Partial<IIngredient>) {
    return ingredientsStore.find(i => i.id === id || i.name === name);
  }

  findMany(ids?: string[]) {
    if (!ids) {
      return ingredientsStore;
    }
    return ingredientsStore.filter(i => ids.includes(i.id));
  }

  update(where: Partial<IIngredient>, data: Partial<IIngredient>) {
  }

  delete() {}
}