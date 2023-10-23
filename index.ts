import { Elysia, t } from "elysia";
import {IngredientRepository} from "@domain/ingredient/repository";
import {IngredientService} from "@domain/ingredient/service";
import {IngredientInterface} from "@interfaces/ingredientInterface";
import {MealRepository} from "@domain/meal/repository";
import {MealService} from "@domain/meal/service";
import {MealInterface} from "@interfaces/mealInterface";

// Initialise dependencies

const ingredientRepository = new IngredientRepository()
const ingredientService = new IngredientService(ingredientRepository)
const ingredientInterface = new IngredientInterface(ingredientService)

const mealRepository = new MealRepository()
const mealService = new MealService(mealRepository)
const mealInterface = new MealInterface(mealService)

// Create routes

const app = new Elysia()
  .decorate('ingredientInterface', ingredientInterface)
  .decorate('mealInterface', mealInterface)
  .get("/", () => "Welcome to elysia")
  .get("/ingredients", ({ingredientInterface}) => {
    return ingredientInterface.list()
  } )
  .post("/ingredients", ({ingredientInterface, body}) => {
    return ingredientInterface.create(body)
  }, {
    body: t.Object({
      name: t.String()
    })
  })
  .get("/meals", ({mealInterface}) => {
    return mealInterface.list()
  })
  .post("/meals", ({mealInterface, body}) => {
    return mealInterface.create(body)
  }, {
    body: t.Object({
      name: t.String(),
      ingredients: t.Optional(t.Array(t.Object({
        quantity: t.Object({
          value: t.Number(),
          unit: t.String()
        }),
        ingredientId: t.String() 
      })))
    })
  })
  .listen(3000);


console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
