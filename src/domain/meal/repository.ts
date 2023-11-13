import {randomUUID} from "crypto";
import { IMeal, IMealModel, MealCreateBody} from "./types";
import Neode from "neode";
import {MealModel} from "./model";
import {IngredientRepository} from "@domain/ingredient/repository";
import {Repository} from "@domain/abstractRepository";
import {CypherRecord} from "@domain/types";

export class MealRepository extends Repository<IMealModel, IMeal, MealCreateBody> {
  constructor(db: Neode, private ingredientRepo: IngredientRepository) {
    super(db, 'Meal', MealModel);
  }

  async create({name, ingredients}: MealCreateBody) {
    const id = randomUUID();
    const toCreate = {id, name};
    const created = await this.model.create(toCreate);

    try {
    for(const ingredient of ingredients) {
      const i = await this.ingredientRepo.find(ingredient.id);

      await created.relateTo(i, 'quantity', ingredient.quantity, true);
    }} catch (e) {
      console.error(e);

      await created.delete()
    }

    const createdMeal = created.properties();
    
    const found = await this.findHydrated(createdMeal.id);

    if(!found) {
      throw new Error('Could not find created meal')
    }

    return found;
  }

  find(id: string) {
    return this.model.find(id)
  }

  async findHydrated(id: string): Promise<IMeal | null> {
    const found = await this.db.cypher('MATCH (m:Meal {id: $id})-[q:HAS_QUANTITY]-(i:Ingredient) RETURN m.id, m.name, q.unit, q.value ,i.id, i.name', {id});

    if (!found.records) {
      return null;
    }

    return this.formatFindResult(found.records as unknown as CypherRecord[])
  } 
  
  async findAll() {
    const found = await this.db.cypher('MATCH (m:Meal)-[q:HAS_QUANTITY]-(i:Ingredient) RETURN m.id, m.name, q.unit, q.value ,i.id, i.name', {});

    if (!found.records) {
      return [];
    }

    return this.formatFindManyResult(found.records as unknown as CypherRecord[])
  }

  async findMany(ids?: string[]) {
    if (!ids?.length) {
      return this.findAll()
    }
    return (await Promise.all(ids.map((id) => this.findHydrated(id)))).filter(Boolean) as IMeal[];
  }

  formatCypher(records: CypherRecord[]) {
    const mealMap = new Map<string, IMeal>();

    const getFieldIndex = (fieldName: string, record: CypherRecord) => record._fieldLookup[fieldName];
    
    records.forEach(r => {
      const mealId = r._fields[getFieldIndex("m.id", r)] as string;
      const mealName = r._fields[getFieldIndex("m.name", r)] as string;

      const existing = mealMap.get(mealId);
      
      const quantity = {
        unit: r._fields[getFieldIndex("q.unit", r)] as string,
        value: r._fields[getFieldIndex("q.value", r)] as number,
      }

      if (!existing) {
        mealMap.set(mealId, {
          id: mealId,
          name: mealName,
          ingredients: []
        })
      }

      const newIngredient = {
        id: r._fields[getFieldIndex("i.id", r)] as string,
        name: r._fields[getFieldIndex("i.name", r)] as string,
        quantity
      }

      mealMap.get(mealId)?.ingredients.push(newIngredient);
    })
    
    return mealMap;
  }

  formatFindResult(records: CypherRecord[]): IMeal {
    return this.formatCypher(records).entries().next().value
  }

  formatFindManyResult(records: CypherRecord[]): IMeal[] {
    return Array.from(this.formatCypher(records).values())
  }
}