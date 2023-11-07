import {randomUUID} from "crypto";
import {IIngredient} from "./types";
import Neode, {Model, RelationshipType} from "neode";
import {QueryResult} from "neo4j-driver";
import {IngredientModel} from "./model";
import {Repository} from "@domain/repository";

export class IngredientRepository extends Repository<IIngredient> {
  constructor(db: Neode) {
    super(db, 'Ingredient', IngredientModel);
  }

  async create(ingredient: Omit<IIngredient, 'id'>) {
    const id = randomUUID();
    const toCreate = {...ingredient, id};
    const created = await this.model.create(toCreate)
    return created.properties();
  }

  createMany(ingredients: Omit<IIngredient, 'id'>[]) {
    return Promise.all(ingredients.map(this.create));
  }

  find(id: string) {
    return this.model.find(id)
  }

  async findMany(ids?: string[]) {
      if (!ids) {
        return this.findAll()
      }

      const nodes = await this.queryManyByIds(ids)

      return this.formatRecords(nodes.records as any)
  }

  async findAll() {
    const all = await this.model.all();

    return all.map(n => n.properties())
  }

  formatRecords(records: QueryResult["records"]): IIngredient[] {
    return records.map(record => record.map(r => r.properties)[0]);
  }
}