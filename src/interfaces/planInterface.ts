import {PlanService} from "@domain/mealPlan/service";
import {AbstractInterface} from "./abstractInterface";
import {IPlanModel,IPlan,PlanCreateBody} from "@domain/mealPlan/types";

export class PlanInterface extends AbstractInterface<IPlanModel, IPlan, PlanCreateBody> {
  constructor(service: PlanService) {
    super(service)
  }
}
