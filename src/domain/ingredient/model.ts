import {SchemaObject} from "neode";

export const IngredientModel: SchemaObject = {
  id: {
    type: 'uuid',
    primary: true
  },
  name: {
    type: 'string',
    unique: true
  },
  quantity: {
    type: 'relationship',
    relationship: 'HAS_QUANTITY',
    direction: 'in',
    properties: {
      value: 'number',
      unit: 'string'
    }
  }
}