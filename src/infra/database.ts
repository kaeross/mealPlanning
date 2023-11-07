
import {IngredientModel} from '@domain/ingredient/model';
import Neode from 'neode';

const URI = Bun.env.NEO4J_URI;
const USER = Bun.env.NEO4J_USERNAME;
const PASSWORD = Bun.env.NEO4J_PASSWORD;

if (!URI || !USER || !PASSWORD) {
  throw new Error('Invalid env')
}


const instance = new Neode(URI, USER, PASSWORD)
.with({Ingredient: IngredientModel});

export const logServerInfo = async () => {
  instance.schema.install()
    console.log('Connection established')
}

(async () => {
  try {
    console.log('getting connection')
    await logServerInfo()
  } catch(err) {
    console.log(`Connection error\n${err}`)
  }
})();

export const db  = instance;
