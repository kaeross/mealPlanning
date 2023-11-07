import {SchemaObject} from "neode";

export const IngredientModel: SchemaObject = {
  id: {
    type: 'uuid',
    primary: true
  },
  name: {
    type: 'string',
    unique: true
  }
}