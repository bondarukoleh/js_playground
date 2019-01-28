const users = [
  { id: 11, name: 'Adam', age: 23, group: 'editor' },
  { id: 47, name: 'John', age: 28, group: 'admin' },
  { id: 85, name: 'William', age: 34, group: 'editor' },
  { id: 97, name: 'Oliver', age: 28, group: 'admin' }
];

/* Flat */
{
  let nested = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
  let flat = nested.reduce((acc, it) => [...acc, ...it], []);
  // flat is [1, 2, 3, 4, 5, 6, 7, 8, 9]
}

/**Create an object that contains the frequency of the specified key */
{
  let groupByAge = users.reduce((acc, it) =>
    ({ ...acc, [it.age]: (acc[it.age] || 0) + 1 }),
    {});
  // groupByAge is {23: 1, 28: 2, 34: 1}
}

/* Indexing an array of objects (lookup table) */
{
  let uTable = users.reduce((acc, it) => ({...acc, [it.id]: it }), {})
// uTable equals:
/* {
  11: { id: 11, name: 'Adam', age: 23, group: 'editor' },
  47: { id: 47, name: 'John', age: 28, group: 'admin' },
  85: { id: 85, name: 'William', age: 34, group: 'editor' },
  97: { id: 97, name: 'Oliver', age: 28, group: 'admin' }
} */
}

/**Extract the unique values for the given key of each item in the array */
{
  let listOfUserGroups = [...new Set(users.map(it => it.group))];
// listOfUserGroups is ['editor', 'admin'];
}

/**Reversal */ 
{
  let cities = {
    Lyon: 'France',
    Berlin: 'Germany',
    Paris: 'France'
  };
  let countries = Object.keys(cities).reduce(
    (acc, k) => (acc[cities[k]] = [...(acc[cities[k]] || []), k], acc) , {});
  // countries is
  /* {
    France: ["Lyon", "Paris"],
    Germany: ["Berlin"]
  } */
}
