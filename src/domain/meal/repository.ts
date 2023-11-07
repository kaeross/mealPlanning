import {randomUUID} from "crypto";
import { IMeal, IMealModel} from "./types";
import Neode from "neode";
import {MealModel} from "./model";
import {IngredientRepository} from "@domain/ingredient/repository";
import {Repository} from "@domain/repository";

export const mealStore: IMeal[] = [];

export class MealRepository extends Repository<IMealModel> {
  constructor(db: Neode, private ingredientRepo: IngredientRepository) {
    super(db, 'Meal', MealModel);
  }

  async create({name, ingredients}: IMeal) {
    const id = randomUUID();
    const toCreate = {id, name};
    const created = await this.model.create(toCreate);

    try {
      const relationships = this.model.relationships();

      const quantityRelationshipType = relationships.get("quantity")?.type()

      if (!quantityRelationshipType) {
        throw new Error('Missing quantity relationship type')
      }

    for(const ingredient of ingredients) {
      const i = await this.ingredientRepo.find(ingredient.ingredientId);

      created.relateTo(i, 'quantity', ingredient.quantity, true)
    }} catch (e) {
      console.error(e);

      await created.delete()
    }
   
    return this.queryManyByIds([created.properties().id])
    .then(res => this.db.hydrateFirst(res as any, 'this', this.model))
  }

  async find(id: string) {
    const found = await this.model.find(id);
    return found;
  } 
  
  async findAll() {
    const all = await this.model.all();

    return all.map(n => n.properties())
  }

  async findMany(ids?: string[]) {
    if (!ids) {
      return this.findAll()
    }
    return mealStore.filter(m => ids.includes(m.id));
  }
}