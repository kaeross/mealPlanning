import {randomUUID} from "crypto";
import { IMeal} from "./types";

export const mealStore: IMeal[] = [];

export class MealRepository {
  create(meal: Omit<IMeal, 'id'>) {
    const id = randomUUID();
    const created = {...meal, id};
    mealStore.push(created);
    return created;
  }

  createMany(meals: Omit<IMeal, 'id'>[]) {
    return meals.map(this.create);
  }

  find({name, id}: Partial<IMeal>) {
    return mealStore.find(m => m.id === id || m.name === name);
  }

  findMany(ids?: string[]) {
    if (!ids) {
      return mealStore;
    }
    return mealStore.filter(m => ids.includes(m.id));
  }

  update(where: Partial<IMeal>, data: Partial<IMeal>) {
  }

  delete() {}
}