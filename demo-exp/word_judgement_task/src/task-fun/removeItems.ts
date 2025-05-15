/**
 * find all index which match the condition
 *
 * @param array the array to search elements
 * @param wordToRemove the word we already used and that we now want to remove from the array 
 * 
 * @returns a copy of the original array without the word we want to remove
 */

export const removeItem = (array, wordToRemove) => {
  return array.filter(v => v.Word !== wordToRemove);
}


