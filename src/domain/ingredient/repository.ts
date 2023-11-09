import {randomUUID} from "crypto";
import { IngredientCreateBody, IIngredientModel} from "./types";
import Neode from "neode";
import {QueryResult} from "neo4j-driver";
import {IngredientModel} from "./model";
import {Repository} from "@domain/repository";

export class IngredientRepository extends Repository<IIngredientModel, IIngredientModel, IngredientCreateBody> {
  constructor(db: Neode) {
    super(db, 'Ingredient', IngredientModel);
  }

  async create(ingredient: IngredientCreateBody) {
    const id = randomUUID();
    const toCreate = {...ingredient, id};
    const created = await this.model.create(toCreate)
    return created.properties();
  }

  createMany(ingredients: IngredientCreateBody[]) {
    return Promise.all(ingredients.map(this.create));
  }

  find(id: string) {
    return this.model.find(id)
  }

  async findMany(ids?: string[]) {
      if (!ids?.length) {
        return this.findAll()
      }

      const nodes = await this.queryManyByIds(ids)

      return this.formatRecords(nodes.records as any)
  }

  async findAll() {
    const all = await this.model.all();

    return all.map(n => n.properties())
  }

  formatRecords(records: QueryResult["records"]): IIngredientModel[] {
    return records.map(record => record.map(r => r.properties)[0]);
  }
}