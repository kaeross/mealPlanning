import {SchemaObject} from "neode";

export const UserModel: SchemaObject = {
  username: {
    type: 'string',
    primary: true,
    unique: true
  },
  password: {
    type: 'string',
  },
  lastLogin: {
    type: 'datetime'
  }
}
