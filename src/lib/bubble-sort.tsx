export function bubbleSort(array: number[]) {
  const arrayRecords: number[][][] = [];
  // first array the original
  arrayRecords.push([[], array.slice()]);
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length - 1; j++) {
      if (array[j] > array[j + 1]) {
        const temp = array[j];
        array[j] = array[j + 1];
        array[j + 1] = temp;

        // adding index to first two positions
        // 1st - larger
        const addedCoordinates = [[j, j + 1], array.slice()];
        arrayRecords.push(addedCoordinates.slice());
      }
    }
  }

  return arrayRecords;
}
