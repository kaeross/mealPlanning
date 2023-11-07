import {randomUUID} from "crypto";
import {IIngredient} from "./types";
import Neode from "neode";
import {QueryResult} from "neo4j-driver";

export const ingredientsStore: IIngredient[] = [];

export class IngredientRepository {
  private modelName = 'Ingredient';

  constructor(private db: Neode) {}

  async create(ingredient: Omit<IIngredient, 'id'>): Promise<IIngredient> {
    const id = randomUUID();
    const created = {...ingredient, id};
    const node = await this.db.create<IIngredient>(this.modelName, created)
    return node.properties();
  }

  createMany(ingredients: Omit<IIngredient, 'id'>[]): Promise<IIngredient[]> {
    return Promise.all(ingredients.map(this.create));
  }

  find({name, id}: Partial<IIngredient>) {
    return ingredientsStore.find(i => i.id === id || i.name === name);
  }

  async findMany(ids?: string[]): Promise<IIngredient[]> {
      if (!ids) {
        return this.findAll()
      }
      const builder = this.db.query();
      const model = this.db.model(this.modelName);

   
       const nodes = await builder
        .match('n', model)
        .where(`n.id in ${JSON.stringify(ids)}`)
        .return('n')
        .execute('READ')

      return this.formatRecords(nodes.records as any)
  }

  async findAll() {
    const all = await this.db.all(this.modelName);

    return all.map(n => n.properties())
  }

  update(where: Partial<IIngredient>, data: Partial<IIngredient>) {
  }

  delete() {}

  formatRecords(records: QueryResult["records"]) {
    return records.map(record => record.map(r => r.properties)[0]);
  }
}