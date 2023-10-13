import {describe, expect, test} from "bun:test";
import {MealPlan} from "./mealPlan";
import {Meal} from "@domain/meal/meal";

describe('MealPlan', () => {
  test('It should create a new meal plan without any meals', () => {
    const date1 = new Date('2022-01-01');
    const date2 = new Date('2022-01-07');
    const plan = MealPlan.create(date1, date2);

    expect(plan.startDate).toBe(date1);
    expect(plan.endDate).toBe(date2);
    expect(plan.meals).toStrictEqual([]);
  });

  test('It create a new plan with meals', () => {
    const bolognaise = Meal.create('Bolognaise');
    const date1 = new Date('2022-01-01');
    const date2 = new Date('2022-01-07');

    const plan = MealPlan.create(date1, date2, [bolognaise]);
   
    expect(plan.startDate).toBe(date1);
    expect(plan.endDate).toBe(date2);
    expect(plan.meals).toStrictEqual([{
      hasBeenMade: false,
      meal: bolognaise
    }]);
  });

  test('adds a meal to a plan', () => {
    const bolognaise = Meal.create('Bolognaise');
    const soup = Meal.create('Soup');
    const date1 = new Date('2022-01-01');
    const date2 = new Date('2022-01-07');

    const plan = MealPlan.create(date1, date2, [bolognaise]);
    plan.addMeal(soup);

    expect(plan.meals).toStrictEqual([{
      hasBeenMade: false,
      meal: bolognaise
    },
    {
      hasBeenMade: false,
      meal: soup
    }]);
  });

  test('list the meals in the plans', () => {
    const bolognaise = Meal.create('Bolognaise');
    const soup = Meal.create('Soup');
    const date1 = new Date('2022-01-01');
    const date2 = new Date('2022-01-07');

    const plan = MealPlan.create(date1, date2, [bolognaise, soup]);

    expect(plan.listMeals()).toStrictEqual([{
      hasBeenMade: false,
      meal: bolognaise
    },
    {
      hasBeenMade: false,
      meal: soup
    }]);
  });

})