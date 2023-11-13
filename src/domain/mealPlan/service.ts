import {Service} from "@domain/abstractService";
import {IPlan, IPlanModel, IPlanCreateBody} from "./types";
import {PlanRepository} from "./repository";

export class PlanService extends Service<IPlanModel, IPlan, IPlanCreateBody> {
  constructor(repository: PlanRepository) {
    super(repository)
  }
}