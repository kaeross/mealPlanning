import {IMeal} from "@domain/meal/types";

interface IPlannedMeal  {
  hasBeenMade: boolean
  meal: IMeal
}

export class MealPlan {
  private constructor(
    public startDate: Date,
    public endDate: Date,
    public meals: IPlannedMeal[]
  ) {}
  
  listMeals(): IPlannedMeal[] {
    return this.meals;
  }

  addMeal(meal: IMeal) {
    this.meals.push({hasBeenMade: false, meal})
  }

  static create(startDate: Date, endDate: Date, meals: IMeal[] = []) {
    return new MealPlan(startDate, endDate, meals.map(meal => ({hasBeenMade: false, meal})))
  }
}