import { Elysia, t } from "elysia";
import {IngredientRepository} from "@domain/ingredient/repository";
import {IngredientService} from "@domain/ingredient/service";
import {IngredientInterface} from "@interfaces/ingredientInterface";
import {MealRepository} from "@domain/meal/repository";
import {MealService} from "@domain/meal/service";
import {MealInterface} from "@interfaces/mealInterface";
import {db} from "@infra/database"
import {PlanRepository} from "@domain/mealPlan/repository";
import {PlanService} from "@domain/mealPlan/service";
import {PlanInterface} from "@interfaces/planInterface";

// Initialise dependencies

const ingredientRepository = new IngredientRepository(db)
const ingredientService = new IngredientService(ingredientRepository)
const ingredientInterface = new IngredientInterface(ingredientService)

const mealRepository = new MealRepository(db, ingredientRepository)
const mealService = new MealService(mealRepository)
const mealInterface = new MealInterface(mealService)


const planRepository = new PlanRepository(db, mealRepository)
const planService = new PlanService(planRepository)
const planInterface = new PlanInterface(planService)

// Create routes

const app = new Elysia()
  .decorate('ingredientInterface', ingredientInterface)
  .decorate('mealInterface', mealInterface)
  .get("/", () => "Welcome to elysia")
  .get("/ingredients", async ({ingredientInterface, query}) => {
    const ids = query.ids ? JSON.parse(query.ids) : undefined;
    return ingredientInterface.list(ids)
  }, {
    query: t.Object({
      ids: t.Optional(t.String())
    })
  })
  .post("/ingredients", async ({ingredientInterface, body}) => {
    return ingredientInterface.create(body)
  }, {
    body: t.Object({
      name: t.String()
    })
  })
  .get("/meals", async ({mealInterface, query}) => {
    const ids = query.ids ? JSON.parse(query.ids) : undefined;
    return mealInterface.list(ids)
  }, {
    query: t.Object({
      ids: t.Optional(t.String())
    })
  })
  .post("/meals",async ({mealInterface, body}) => {
    return mealInterface.create(body)
  }, {
    body: t.Object({
      name: t.String(),
      ingredients: t.Array(t.Object({
        quantity: t.Object({
          value: t.Number(),
          unit: t.String()
        }),
        id: t.String() 
      }))
    })
  })
  .listen(3000)
  .onStop(() => {
    console.log('disconnecting')
    db.close()
  });


console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
