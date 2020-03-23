/* Remove duplicates from an array of numbers/strings */
{
  const values = [3, 1, 3, 5, 2, 4, 4, 4];
  const uniqueValues = [...new Set(values)];
  // [3, 1, 5, 2, 4]
}

/*A simple search (case-insensitive) */
{
  let users = [
    {id: 11, name: 'Adam', age: 23, group: 'editor'},
    {id: 47, name: 'John', age: 28, group: 'admin'},
    {id: 85, name: 'William', age: 34, group: 'editor'},
    {id: 97, name: 'Oliver', age: 28, group: 'admin'}
  ];

  let res = users.filter(it => new RegExp('oli', "i").test(it.name));
  // [{ id: 97, name: 'Oliver', age: 28, group: 'admin' }]
}