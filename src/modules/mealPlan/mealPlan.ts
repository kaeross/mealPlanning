import {Meal} from "@modules/meal/meal";

interface IPlannedMeal  {
  hasBeenMade: boolean
  meal: Meal
}

export class MealPlan {
  constructor(
    public startDate: Date,
    public endDate: Date,
    public meals: IPlannedMeal[]
  ) {}
  
  listMeals(): IPlannedMeal[] {
    return this.meals;
  }

  addMeal(meal: Meal) {
    this.meals.push({hasBeenMade: false, meal})
  }

  static create(startDate: Date, endDate: Date, meals: Meal[] = []) {
    return new MealPlan(startDate, endDate, meals.map(meal => ({hasBeenMade: false, meal})))
  }
}