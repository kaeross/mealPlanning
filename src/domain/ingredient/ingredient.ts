import {randomUUID} from "crypto";

export const ingredientsStore: Ingredient[] = [];

export class Ingredient {
  constructor( public name: string, public id: string){}

  static create(name: string) {
    const id = randomUUID();
    return new Ingredient(name, id)
  }

  save() {
    ingredientsStore.push(this);
  }

  stringify() {
    return {
      id: this.id,
      name: this.name
    }
  }
}