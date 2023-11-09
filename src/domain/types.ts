export type CypherRecord = 
  {
      "keys": Array<string>,
      "length": number,
      "_fields": Array<unknown>,
      // Used to get the index in the fields array of the key
      "_fieldLookup": Record<string, number>
  }
