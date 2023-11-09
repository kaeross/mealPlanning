import {Service} from "@domain/service";
import {IPlan, IPlanModel, IPlanCreateBody} from "./types";
import {PlanRepository} from "./repository";

export class PlanService extends Service<IPlanModel, IPlan, IPlanCreateBody> {
  constructor(repository: PlanRepository) {
    super(repository)
  }
}