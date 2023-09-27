import {describe, expect, test} from "bun:test";
import {Ingredient} from ".";

describe('Ingredient', () => {
  test('Creates a carrot', () => {
    const carrot = Ingredient.create('Carrot')
    expect(carrot.name).toStrictEqual('Carrot')
  })
})