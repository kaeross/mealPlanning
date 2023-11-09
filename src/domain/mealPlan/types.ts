import {IMeal} from "@domain/meal/types";

export interface IPlanCreateBody {
  mealIds: Array<string>
} 

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