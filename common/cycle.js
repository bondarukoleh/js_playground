const cl = console.log;
const a = {l:{g: 'inner'}, o:'outer'}
for(let aa in a){
	cl(aa)
}

cl('g' in a); cl('o' in a);
