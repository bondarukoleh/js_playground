function checkArgs(a, b){
  console.log(`a: ${a}, b: ${b}, %j`, arguments)
  arguments[0] = 'new a value'
  console.log(`a: ${a}, b: ${b}, %j`, arguments)
}

checkArgs('aValue', 'bValue')