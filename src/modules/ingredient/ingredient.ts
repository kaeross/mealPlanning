export class Ingredient {
  constructor(public name: string){}

  static create(name: string) {
    return new Ingredient(name)
  }
}