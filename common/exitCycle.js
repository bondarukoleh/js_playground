const cl = console.log;
const simpleFor = () => {
	for (let i = 0; i < 2; i++) {
		cl('simple for', i)
		return; // exited
	}
}
// simpleFor()
const forOf = () => {
	for (let a of [1, 2]) {
		cl('for of', a)
		return; // exited
	}
}
// forOf()
const forEach = () => {
	[1, 2].forEach((a) => {
		cl('for each', a)
		return; // NOT exited
	})
}
// forEach()
