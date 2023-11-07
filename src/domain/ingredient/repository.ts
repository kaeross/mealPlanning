import {randomUUID} from "crypto";
import {IIngredient} from "./types";
import Neode, {Model} from "neode";
import {QueryResult} from "neo4j-driver";
import {IngredientModel} from "./model";

export const ingredientsStore: IIngredient[] = [];

export class IngredientRepository {
  model: Model<IIngredient>;

  constructor(private db: Neode) {
    this.model = db.model<IIngredient>('Ingredient', IngredientModel);
  }

  async create(ingredient: Omit<IIngredient, 'id'>) {
    const id = randomUUID();
    const created = {...ingredient, id};
    const node = await this.model.create(created)
    return node.properties();
  }

  createMany(ingredients: Omit<IIngredient, 'id'>[]) {
    return Promise.all(ingredients.map(this.create));
  }

  find({name, id}: Partial<IIngredient>) {
    return ingredientsStore.find(i => i.id === id || i.name === name);
  }

  async findMany(ids?: string[]) {
      if (!ids) {
        return this.findAll()
      }
      const builder = this.db.query();

       const nodes = await builder
        .match('n', this.model)
        .where(`n.id in ${JSON.stringify(ids)}`)
        .return('n')
        .execute('READ')

      return this.formatRecords(nodes.records as any)
  }

  async findAll() {
    const all = await this.model.all();

    return all.map(n => n.properties())
  }

  update(where: Partial<IIngredient>, data: Partial<IIngredient>) {
  }

  delete() {}

  formatRecords(records: QueryResult["records"]): IIngredient[] {
    return records.map(record => record.map(r => r.properties)[0]);
  }
}