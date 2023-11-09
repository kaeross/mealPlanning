import {Service} from "@domain/service";
import {IPlan, IPlanModel, PlanCreateBody} from "./types";
import {PlanRepository} from "./repository";

export class MealService extends Service<IPlanModel, IPlan, PlanCreateBody> {
  constructor(repository: PlanRepository) {
    super(repository)
  }
}