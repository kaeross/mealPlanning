import {SchemaObject} from "neode";

export const IngredientModel: SchemaObject = {
  id: {
    type: 'uuid',
  },
  name: {
    type: 'string',
  }
}