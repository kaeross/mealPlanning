import { Elysia, t } from "elysia";
import {createIngredientHandler} from "./src/interfaces/ingredients/create";
import {listIngredientHandler} from "./src/interfaces/ingredients/list";
import {createMealHandler} from "./src/interfaces/meal/create";
import {listMealHandler} from "./src/interfaces/meal/list";

const app = new Elysia()
  .get("/", () => "Welcome to elysia")
  .get("/ingredients", listIngredientHandler)
  .post("/ingredients", createIngredientHandler, {
    body: t.Object({
      name: t.String()
    })
  })
  .get("/meals", listMealHandler)
  .post("/meals", createMealHandler, {
    body: t.Object({
      name: t.String(),
      ingredients: t.Optional(Object({
        quantity: t.Object({
          value: t.Number(),
          unit: t.String()
        }),
        ingredientId: t.String() 
      }))
    })
  })
  .listen(3000);


console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
