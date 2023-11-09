import {Service} from "@domain/service";
import {MealRepository} from "./repository";
import {IMeal, IMealModel, MealCreateBody} from "./types";

export class MealService extends Service<IMealModel, IMeal, MealCreateBody> {
  constructor(repository: MealRepository) {
    super(repository)
  }
}