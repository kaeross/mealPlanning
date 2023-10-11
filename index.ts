import { Elysia } from "elysia";
import {createIngredientHandler} from "./src/interfaces/ingredients/create";
import {listIngredientHandler} from "./src/interfaces/ingredients/list";

const app = new Elysia()
  .get("/", () => "Welcome to elysia")
  .get("/ingredients", listIngredientHandler)
  .post("/ingredients", createIngredientHandler)
  .listen(3000);


console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
