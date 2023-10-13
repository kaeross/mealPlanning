import {describe, expect, test} from "bun:test";
import {Ingredient} from "./ingredient";

describe('Ingredient', () => {
  test('Creates a carrot', () => {
    const carrot = Ingredient.create('Carrot')
    expect(carrot.name).toStrictEqual('Carrot')
  })
})