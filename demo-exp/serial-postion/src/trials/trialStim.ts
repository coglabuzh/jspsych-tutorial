
import { random } from "../basic-fun/random"
import { sequence } from "../basic-fun/sequence";

/**
 * Generates a stimulus array based on the specified condition.
 * @param {string} condition - The condition to generate the stimulus array for.
 * @returns {Object} An object containing the stimulus array and the positions to be removed (if applicable).
 */
export const generateStims = function(setsize: number = 6, nBox:number = 8, stim = "letter") {

  var stim_pool:string[] = [];

    // Create an array of the English alphabet.
    if (stim=="letter") var stim_pool = sequence.alphabet();
    if (stim=="image") {
      for (let i = 1; i < 12; i++) {
        stim_pool.push(`assets/images/stimuli/Image${i}.jpg`);
      };
    } 
  
    // Sample setsize random elements from alphabet_array and store them in stim_array.
    var stim_array = random.sample(stim_pool, nBox);
  
    // If the "keeping6" condition is specified, replace two items in the initial five positions with the "#" character.
    if (setsize < 8) {
      // Randomly select 2 positions from the first 5 positions of stim_array and store them in hashPosList.
      var hashPosList = random.sample(Array.from(Array(nBox).keys()), nBox - setsize);
  
      // Replace the elements at the positions in hashPosList with the "#" character.
      for (var pos of hashPosList) {
        stim_array[pos] = "#";
      }
    }
  
    // Return an object containing the stim_array and the positions to be removed (if applicable).
    return  stim_array;
  
  };