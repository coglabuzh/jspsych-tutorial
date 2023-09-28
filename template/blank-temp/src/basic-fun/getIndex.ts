/**
 * find all index which match the condition
 *
 * @param {Array} arr the array to search elements
 * @param {number|string} item detected item.
 * @param {boolean} match boolean; if true, return matched index; if false, return unmatched index.
 * @returns
 */
export const getIndex = function (
  arr: any[],
  item: number | string,
  match: boolean = true
) {
  var indexes: number[] = [],
    i = -1;
  if (match) {
    for (var i = 0; i < arr.length; i++) {
      if (arr[i] === item) indexes.push(i);
    }
  } else {
    for (var i = 0; i < arr.length; i++) {
      if (arr[i] !== item) indexes.push(i);
    }
  }
  return indexes;
};
