// Purpose: Generates a stimulus array based on the specified condition.

import { random } from "@coglabuzh/webpsy.js"
import { jsPsych } from "../jsp"; // we will need to use jPsych plug-ins
import { expInfo } from "../settings";
import { words } from "../../assets/words";
import { removeItem } from "../task-fun/removeItems";

/**
 * Generates a stimulus array based on the specified condition.
 * @param stimArray The array of stimuli to be used in the experiment.
 * @param animacy Is the object animated or inanimated? 
 */
export const generateStims = function (
  stimArray,
  animacy: string) 
  {
    let localStimArray = [...stimArray]; // we copy the original array in order to not modify it directly 

    /* Filter the words based on the animacy condition
    
    .filter is a built-in JavaScript Array method that 
    lets you take an existing array and produce a new array 
    containing only those elements that pass a test you define.
    In this case, we are filtering from our localArray the words based on their animacy.
    */
    let filteredWords = localStimArray.filter( 
      (word) => word.Animacy == animacy
    ); 

    /* in un secondo momento e se necessario: Check if filteredWords is empty
    if (filteredWords.length === 0) {
      throw new Error(
      "No stimuli available that match the criteria. Please check your filtering conditions."
      );
    }
    */

    // Choose a random word from the filtered list
    let randomIndex = Math.floor(Math.random() * filteredWords.length);
    let chosenWord = filteredWords[randomIndex].Word;
    let isAnimate = filteredWords[randomIndex].Animacy;

    // in un secondo momento aggiungiamo questo: We don't want to repeat the words over the experiment, so we remove the chosen word from the array
    const remainingWords = removeItem(localStimArray, chosenWord);
    stimArray.length = 0; // Clear the original array
    stimArray.push(...remainingWords); // Refill it with the updated array

    let chosenStimulus = {
      word: chosenWord,
      animacy: isAnimate
  };

  return chosenStimulus;
};

/**
 * A function used to create a list of trials.
 *
 * @returns A list of trials.
 */

export function create_trialList(excludeWords: string[] = []) {
  let localWords = [...words]; // we copy the original array in order to not modify it directly

  let target_conditions = {
    animacy: expInfo.DESIGN.CONDITIONS,
  };

  // to generate a random list of trial variables
  let block_conditions = jsPsych.randomization.factorial(
    target_conditions,
    expInfo.DESIGN.nTRIALS,
    false
  );

  block_conditions.forEach((trial, i) => {
    if (trial.animacy == "animate") {
      trial.word_animacy = expInfo.DESIGN.ANIMACY_VALUE[1];
    } else if (trial.animacy == "inanimate") {
      trial.word_animacy = expInfo.DESIGN.ANIMACY_VALUE[0];
    } // we

    trial.stimulus = generateStims(
      localWords,
      trial.word_animacy,
    );
    
    trial.trial_number = i + 1;
    localWords = removeItem(localWords, trial.stimulus.word);
  });

  return block_conditions;
}

