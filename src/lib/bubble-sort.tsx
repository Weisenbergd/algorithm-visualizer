export function bubbleSort(array: number[]) {
  const arrayRecords: number[][] = [];
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length - 1; j++) {
      if (array[j] > array[j + 1]) {
        const temp = array[j];
        array[j] = array[j + 1];
        array[j + 1] = temp;

        // first j, second j +1
        // array.unshift(j + 1);
        // array.unshift(j);
        arrayRecords.push(array.slice());
      }
    }
  }

  return arrayRecords;
}
