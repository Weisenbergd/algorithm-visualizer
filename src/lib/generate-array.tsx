export function generateArray(size: number, arrayType: string = "number") {
  const array: number[] = [];
  if (arrayType === "number") {
    for (let i = 0; i < size; i++) {
      array.push(Math.floor(Math.random() * 101));
    }
  }

  console.log("ge", array);

  return array;
}
