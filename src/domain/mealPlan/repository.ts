import {randomUUID} from "crypto";
import Neode from "neode";
import {PlanModel} from "./model";
import {Repository} from "@domain/abstractRepository";
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
    const found = await this.db.cypher('MATCH (p:Plan {id: $id})-[r:INCLUDES]-(m:Meal) RETURN m.id, m.name, r.consumedAt', {id});

    if (!found.records) {
      return null;
    }

    return this.formatFindResult(found.records as unknown as CypherRecord[])
  } 
  
  async findAll(): Promise<IPlan[]> {
    const found = await this.db.cypher('MATCH (p:Plan)-[r:INCLUDES]-(m:Meal) RETURN p.id, m.id, m.name, r.consumedAt', {});

    if (!found.records) {
      return [];
    }

    return this.formatFindManyResult(found.records as unknown as CypherRecord[])
  }

  async findMany(ids?: string[]) {
    if (!ids?.length) {
      return this.findAll()
    }
    return (await Promise.all(ids.map((id) => this.findHydrated(id)))).filter(Boolean) as IPlan[];
  }

  formatCypher(records: CypherRecord[]) {
    const planMap = new Map<string, IPlan>();

    const getFieldIndex = (fieldName: string, record: CypherRecord) => record._fieldLookup[fieldName];
    
    records.forEach(r => {
      const planId = r._fields[getFieldIndex("p.id", r)] as string;

      const existing = planMap.get(planId);

      if (!existing) {
        planMap.set(planId, {
          id: planId,
          meals: []
        })
      }

      const newMeal = {
        id: r._fields[getFieldIndex("m.id", r)] as string,
        name: r._fields[getFieldIndex("m.name", r)] as string,
        consumedAt: r._fields[getFieldIndex("r.consumedAt", r)] as string | null,
      }

      planMap.get(planId)?.meals.push(newMeal);
    })
    
    return planMap;
  }

  formatFindResult(records: CypherRecord[]): IPlan {
    return this.formatCypher(records).entries().next().value
  }

  formatFindManyResult(records: CypherRecord[]): IPlan[] {
    return Array.from(this.formatCypher(records).values())
  }
}