import {PlanService} from "@domain/mealPlan/service";
import {AbstractInterface} from "./abstractInterface";
import {IPlanModel,IPlan,IPlanCreateBody} from "@domain/mealPlan/types";

export class PlanInterface extends AbstractInterface<IPlanModel, IPlan, IPlanCreateBody> {
  constructor(service: PlanService) {
    super(service)
  }
}
