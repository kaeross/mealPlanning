import {SchemaObject} from "neode";

export const MealModel: SchemaObject = {
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
    relationship: 'QUANTITY',
    direction: 'out',
    properties: {
      value: 'number',
      unit: 'string'
    }
  }
}
