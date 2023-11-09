import {Repository} from "./repository";

export abstract class Service<TModel, TReturn, TCreate> {
  constructor(private repository: Repository<TModel, TReturn, TCreate>) {}

  list(ids?: string[]) {
    return this.repository.findMany(ids)
  }

  create(meal: TCreate) {
    return this.repository.create(meal);
  }
}