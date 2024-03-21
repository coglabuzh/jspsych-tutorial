// Basic functions
import { random } from "@coglabuzh/webpsy.js";
import { expInfo } from "../settings";
/**
 * Generates a stimulus array based on the specified condition.
 * @param {number} [setsize=6] - The number of stimuli to generate (default is 6).
 * @param {number} [nBox=8] - The number of boxes presented (default is 8).
 * @param {string} [stim="letter"] - The type of stimuli to generate ("letter" or "image," default is "letter").
 * @returns {string[]} An array of generated stimuli based on the specified parameters.
 */
export const generateStims = function (
  setsize: number = 6,
  nBox: number = 8,
) {
  var stim_pool: string[] = [];

  // Create an stimulus pool
  stim_pool = expInfo.DESIGN.STIM.slice();

  // Sample setsize random elements from alphabet_array and store them in stim_array.
  var stim_array = random.sample(stim_pool, nBox);

  // If the setsize is less than 8, replace the remaining elements with the "#" character.
  if (setsize < 8) {
    var hashPosList = random.sample(
      Array.from(Array(nBox).keys()),
      nBox - setsize
    );

    // Replace the elements at the positions in hashPosList with the "#" character.
    for (var pos of hashPosList) {
      stim_array[pos] = "#";
    }
  }

  // Return an object containing the stim_array and the positions to be removed (if applicable).
  return stim_array;
};
