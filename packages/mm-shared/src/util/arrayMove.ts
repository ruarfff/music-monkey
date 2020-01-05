/**
 * In place movement of an element in an array.
 * This will modify the array in place.
 *
 * @param array The array to modify
 * @param oldIndex The current index of the element to be moved
 * @param newIndex The target index to move the element to
 */
export default function arrayMove(
  array: any[],
  oldIndex: number,
  newIndex: number
): void {
  if (newIndex >= array.length) {
    let k = newIndex - array.length + 1
    while (k--) {
      array.push(undefined)
    }
  }
  array.splice(newIndex, 0, array.splice(oldIndex, 1)[0])
}
