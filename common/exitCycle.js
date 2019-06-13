const cl = console.log;
const simpleFor = () => {
	for(let i = 0; i < 2; i++){
		cl('simple for', i)
		return;
	}
}
simpleFor()
const forOf = () => {
	for(let a of [1,2]){
		cl('for of', a)
		return;
	}
}
forOf()
const forEach = () => {
	[1,2].forEach((a) => {
		cl('for each',  a)
		return;
	}) 
}
forEach()

function isPrime (number) {                   if(number  <  2)  {  return  false;  }            for(let  i  =  2;  i  <  number;  i++)  {           if(number  %  i  ===  0)  {  return  false;  }   }   return true} 

cl(isPrime(1234566)) 
