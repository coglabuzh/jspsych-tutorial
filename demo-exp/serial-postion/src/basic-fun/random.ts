export const random = {
  /** This function generate a random floating-point number between 0 (inclusive) and 1 (exclusive)
   *
   * @returns a random number between 0 and 1
   */
  random: function () {
    return Math.random(); // Returns a random floating-point number between 0 (inclusive) and 1 (exclusive)
  },

  /** This function generates a random integer within the specified range.
   *
   * @param start
   * @param end
   * @returns a random integer in the given range
   */
  randint: function (start: number, end: number): number {
    return start + Math.floor(Math.random() * (end - start)); // Returns a random integer between start (inclusive) and end (exclusive)
  },

  /** shuffle the given array, support any type of array
   *
   * @param array
   * @returns an array
   */
  shuffle_new: function <T>(array: T[]) {
    // Iterate through the array backwards
    for (let i = array.length - 1; i > 0; i--) {
      // Generate a random number between 0 and the current index
      const j = Math.floor(Math.random() * (i + 1));
      // Swap the current item with the randomly chosen one
      [array[i], array[j]] = [array[j], array[i]];
    }
    // Return the shuffled array
    return array;
  },

  /**
   * Randomly shuffles an array in-place using Knuth's algorithm
   * (an optimized version of the Fisher-Yates shuffle, see
   * https://en.wikipedia.org/wiki/Fisher–Yates_shuffle and
   * https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
   * @param {Array} array The array to shuffle
   * Returns:
   *      Nothing, randomizes in-place
   */
  shuffle: function <T>(array: T[]) {
    for (let i = array.length - 1; i > 0; i--) {
      let idx = Math.floor(Math.random() * (i + 1));
      let current = array[i];
      array[i] = array[idx];
      array[idx] = current;
    }
  },

  /** Sample a specified number of elements from an array, allowing for either repeated or non-repeated sampling.
   *
   * @param arr
   * @param num  The sample size.
   * @param repeat if true, the sampled array could have repeated element; otherwise, not.
   * @returns
   */
  sample: function <T>(arr: T[], num: number, repeat = false): T[] {
    const result: T[] = [];
    const new_arr: T[] = Array.from(arr);

    // If repeat is false, sample without repetition
    if (!repeat) {
      // Repeat num times
      for (let i = 0; i < num; i++) {
        // Randomly generate a number between 0 and new_arr.length - 1
        const ran = Math.floor(Math.random() * new_arr.length);
        // Add the element at index ran of new_arr to the result array
        result.push(new_arr.splice(ran, 1)[0]);
        // Remove the element at index ran from new_arr
      }
    } else {
      // Repeat num times
      for (let i = 0; i < num; i++) {
        // Randomly generate a number between 0 and arr.length - 1
        const ran = Math.floor(Math.random() * arr.length);
        // Add the element at index ran of arr to the result array
        result.push(arr[ran]);
      }
    }

    // Return the sampled elements array
    return result;
  },
};
