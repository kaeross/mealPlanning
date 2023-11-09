import {SchemaObject} from "neode";

export const PlanModel: SchemaObject = {
  id: {
    type: 'uuid',
    primary: true
  },
  includes: {
    type: 'relationship',
    relationship: 'INCLUDES',
    direction: 'out',
    properties: {
      consumedAt: 'datetime'
    }
  }
}
