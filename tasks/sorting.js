// buble
const arr = [3, 5, 1, 2, 1, 45, 772, 0];
let iteration1 = 0;
let iteration2 = 0;

for (let i = 0; i < arr.length; i++) {
  for (let j = 0; j < arr.length - 1; j++) {
    iteration1++;
    if (arr[j] > arr[j + 1]) {
      const temp = arr[j + 1];
      arr[j + 1] = arr[j];
      arr[j] = temp;
    }
  }
}
console.log(arr, iteration1);
const arr2 = [3, 5, 1, 2, 1, 0];
for (let i = 0, borderI = arr2.length - 1; i < borderI; i++) {
  for (let j = 0, borderJ = borderI - i; j < borderJ; j++) {
    iteration2++;
    if (arr2[j] > arr2[j + 1]) {
      const temp = arr2[j + 1];
      arr2[j + 1] = arr2[j];
      arr2[j] = temp;
    }
  }
}
console.log(arr2, iteration2);
const arr3 = [3, 5, 1, 2, 1, 0];
arr3.sort();
console.log(arr3);
const arr4 = [3, 5, 1, 2, 1, 0];
let iter = 0;
const bubbleSort = arr => {
  for (let i = 0, endI = arr.length - 1; i < endI; i++) {
    let wasSwap = false;
    for (let j = 0, endJ = endI - i; j < endJ; j++) {
      iter++;
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        wasSwap = true;
      }
    }
    if (!wasSwap) break;
  }
  return arr;
};
console.log(bubbleSort(arr4), iter); 