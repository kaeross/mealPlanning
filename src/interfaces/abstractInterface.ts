import {Service} from "@domain/abstractService";

export abstract class AbstractInterface<TModel, TReturn, TCreate> {
  constructor(protected service: Service<TModel, TReturn, TCreate>) {}

  list(ids?: string[]): Promise<TReturn[]> {
    return this.service.list(ids)
  }

  async create(ingredient: TCreate): Promise<TReturn> {
    return this.service.create(ingredient)
  }
}
