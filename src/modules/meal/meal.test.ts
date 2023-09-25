import {Ingredient} from "@modules/ingredient/ingredient";
import {describe, expect, test} from "bun:test";
import {Meal} from "./meal";

describe('Meal', () => {
  test('It should create a new meal without any ingredients', () => {
    const air = Meal.create('air');
    expect(air.name).toBe('air');
    expect(air.ingredients).toStrictEqual([]);
  });

  test('It create a new meal with ingredients', () => {
    const carrot = Ingredient.create('Carrot');
    const air = Meal.create('air', [{
      ingredient: carrot,
      quantity: {
        value: 3,
        unit: 'items'
      }
    }]);
    expect(air.name).toBe('air');
    expect(air.ingredients).toStrictEqual([{
      ingredient: carrot,
      quantity: {
        value: 3,
        unit: 'items'
      }
    }]);
  });

  test('adds an ingredient to a meal', () => {
    const carrot = Ingredient.create('Carrot');
    const soup = Meal.create('Carrot soup', [{
      ingredient: carrot,
      quantity: {
        value: 3,
        unit: 'items'
      }
    }]);

    const onion = Ingredient.create('Onion');
    soup.addIngredient(onion, {value: 1, unit: 'items'});

    expect(soup.ingredients).toStrictEqual([{
      ingredient: carrot,
      quantity: {
        value: 3,
        unit: 'items'
      }
    },
    {
      ingredient: onion,
      quantity: {
        value: 1,
        unit: 'items'
      }
    }]);
  });

  test('list the meal ingredients', () => {
    const carrot = Ingredient.create('Carrot');
    const onion = Ingredient.create('Onion');

    const soup = Meal.create('Carrot soup', [{
      ingredient: carrot,
      quantity: {
        value: 3,
        unit: 'items'
      }
    },
    {
      ingredient: onion,
      quantity: {
        value: 1,
        unit: 'items'
      }
    }]);

    const list = soup.listIngredients();

    expect(list).toStrictEqual([{
      ingredient: carrot,
      quantity: {
        value: 3,
        unit: 'items'
      }
    },
    {
      ingredient: onion,
      quantity: {
        value: 1,
        unit: 'items'
      }
    }]);
  });

})