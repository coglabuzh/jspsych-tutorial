
export const random = {
  /**
   * 
   * @returns a random number between 0 and 1
   */
  random: function () {
    return Math.random(); // Returns a random floating-point number between 0 (inclusive) and 1 (exclusive)
  },
  /**
   * generates a random integer in the given range
   * @param start 
   * @param end 
   * @returns a random integer in the given range
   */
  randint: function (start, end) {
    return start + Math.floor(Math.random() * (end - start)); // Returns a random integer between start (inclusive) and end (exclusive)
  },
  /**
   * shuffle the given array
   * @param array 
   * @returns an array
   */
  shuffle: function (array) {
    let currentIndex = array.length,
      randomIndex;
  
    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex); // Generate a random index within the range of the remaining elements
      currentIndex--;
      
      // Swap the current element with the element at the random index
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }
  
    return array; // Return the shuffled array
  },
  /**
   * 
   * @param arr 
   * @param num  The sample size.
   * @param repeat if true, the sampled array could have repeated element; otherwise, not.
   * @returns 
   */
  sample: function <T>(arr: T[], num: number, repeat = false): T[] {
    const result: T[] = [];
    const new_arr: T[] = Array.from(arr);
  
    if (!repeat) {
      for (let i = 0; i < num; i++) {
        const ran = Math.floor(Math.random() * new_arr.length);
        result.push(new_arr.splice(ran, 1)[0]); // Remove and add a random element from new_arr to the result array (without repetition)
      }
    } else {
      for (let i = 0; i < num; i++) {
        const ran = Math.floor(Math.random() * arr.length);
        result.push(arr[ran]); // Add a random element from arr to the result array (with repetition)
      }
    }
  
    return result; // Return the sampled elements array
  }
};
