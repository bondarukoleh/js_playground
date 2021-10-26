function labeledFor() {
  outerFor: for (let i = 0; i < 3; i++) {
    console.log('----------------');
    console.log(`This is outerFor, i  - "${i}"`);
    for (let j = 0; j < 2; j++) {
      console.log(`This is inner for, j  - "${j}"`);
      if(j === 1) {
        break outerFor; /* break both cycles, not only inner one */
      }
    }
  }
}

// labeledFor()
/*----------------
This is outerFor, i  - "0"
This is inner for, j  - "0"*/

function labeledBlock() {
  let finishedWork = false;
  function doSomeSpecificWork() {console.log('doSomeSpecificWork'), finishedWork = true};
  const doOtherWork = () => console.log('doOtherWork');

  specificWork: {
    doSomeSpecificWork();
    if (finishedWork) {
      break specificWork; // immediately exits the `specificWork: {...}` block
    }
    doOtherWork();
  }
}
// labeledBlock()
