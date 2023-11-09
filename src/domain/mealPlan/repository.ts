import {randomUUID} from "crypto";
import Neode from "neode";
import {PlanModel} from "./model";
import {Repository} from "@domain/repository";
import {MealRepository} from "@domain/meal/repository";
import {IPlan, IPlanModel, IPlanCreateBody} from "./types";
import {CypherRecord} from "@domain/types";

export class PlanRepository extends Repository<IPlanModel, IPlan, IPlanCreateBody> {
  constructor(db: Neode, private mealRepo: MealRepository) {
    super(db, 'Plan', PlanModel);
  }

  async create({mealIds}: IPlanCreateBody) {
    const id = randomUUID();
    const toCreate = {id};
    const created = await this.model.create(toCreate);

    try {
      const relationships = this.model.relationships();

      const quantityRelationshipType = relationships.get("quantity")?.type()

      if (!quantityRelationshipType) {
        throw new Error('Missing quantity relationship type')
      }

    for(const mealId of mealIds) {
      const m = await this.mealRepo.find(mealId);

      await created.relateTo(m, 'includes', {consumedAt: null}, true)
    }} catch (e) {
      console.error(e);

      await created.delete()
    }

    const createdMeal = created.properties();
    
    const found = await this.findHydrated(createdMeal.id);

    if (!found) {
      throw new Error('Cannot retreive created meal');
    }

    return found;
  }

  async findHydrated(id: string) {
    const found = await this.db.cypher('MATCH (p:Plan {id: $id})-[q:INCLUDES]-(m:Meal) RETURN m.id, m.name, q.unit, q.value', {id});

    if (!found.records) {
      return null;
    }

    return this.formatFindResult(found.records as unknown as CypherRecord[])
  } 
  
  async findAll() {
    const all = await this.model.all();

    return all.map(n => n.properties())
  }

  async findMany(ids?: string[]) {
    if (!ids?.length) {
      return this.findAll()
    }
    return Promise.all(ids.map((id) => this.findHydrated(id)));
  }

  formatFindResult(records: CypherRecord[]): IPlan {
    const getFieldIndex = (fieldName: string, record: CypherRecord) => record._fieldLookup[fieldName];

    
    const mealId = records[0]._fields[getFieldIndex("m.id", records[0])] as string;
    
    const meals = records.map(r => {

      return {
        id: r._fields[getFieldIndex("m.id", r)] as string,
        name: r._fields[getFieldIndex("m.name", r)] as string,
        consumedAt: null
      }
    })
    
    return {
      id: mealId,
      meals
    }
  }
  
}