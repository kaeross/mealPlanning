import {IMeal} from "@domain/meal/types";

export type PlanCreateBody = Omit<IPlan, 'id'>

export interface IPlannedMeal extends Partial<IMeal> {
  consumedAt: string | null
  id: string
}

export interface IPlanModel {
  id: string
}

export interface IPlan extends IPlanModel {
  meals: Array<IPlannedMeal>
}
