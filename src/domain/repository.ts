import {QueryResult} from "neo4j-driver";
import Neode, {Model, SchemaObject} from "neode";

export abstract class Repository<TModel, TReturn, TCreate> {
  protected model: Model<TModel>;

  constructor(protected db: Neode, modelName: string, modelSchema: SchemaObject) {
    this.model = db.model<TModel>(modelName, modelSchema);
  }

  abstract findMany(ids?: string[]): Promise<TReturn[]>

  abstract create(data: TCreate): Promise<TReturn>

  async queryById(id: string)  {
    const builder = this.db.query();

     return builder
      .match('n', this.model)
      .where('n.id', id)
      .return('n')
      // Have to cast as this does not seem correctly typed
      .execute() as unknown as Promise<QueryResult>
  }

  async queryManyByIds(ids: string[])  {
    const builder = this.db.query();

     return builder
      .match('n', this.model)
      .where(`n.id in ${JSON.stringify(ids)}`)
      .return('n')
      // Have to cast as this does not seem correctly typed
      .execute() as unknown as Promise<QueryResult>
  }
}