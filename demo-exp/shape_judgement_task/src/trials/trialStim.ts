// Purpose: Generates a stimulus array based on the specified condition.

import { random } from "@coglabuzh/webpsy.js"
import psychophysics from "@kurokida/jspsych-psychophysics";
import { expInfo } from "../settings";
import { jsPsych } from "../jsp";

/**
 * Generates a stimulus array based on the specified condition.
 * @param XY
 */
export const generateStims = function (form: string, positionX: number, positionY: number) {
  
  let square = {
    obj_type: "rect", 
    origin_center: true, 
    startX: positionX, 
    startY: positionY,
    width: expInfo.DESIGN.WIDTH,
    height: expInfo.DESIGN.HEIGHT,
    line_color: expInfo.DESIGN.targetCOLOR,
    fill_color: expInfo.DESIGN.targetCOLOR,
  }

  let circle = {
    obj_type: "circle",
    origin_center: true,
    startX: positionX,
    startY: positionY,
    radius: expInfo.DESIGN.WIDTH / 2,
    line_color: expInfo.DESIGN.targetCOLOR,
    fill_color: expInfo.DESIGN.targetCOLOR,
  };

  let chosenStim = form == "circle" ? circle : square;

  return [chosenStim];

};

export function create_trialList() {
  
  let target_conditions = {
    condition: expInfo.DESIGN.CONDITIONS,
    positionX: expInfo.DESIGN.POSITIONS.X,
    positionY: expInfo.DESIGN.POSITIONS.Y,
  }

  let block_conditions = jsPsych.randomization.factorial(
    target_conditions,
    expInfo.DESIGN.nTRIALS,
    false
  );

  block_conditions.forEach((trial, i) => {
    
    if (trial.condition == "circle") {
      trial.form = expInfo.DESIGN.CONDITIONS[0];
    } else if (trial.condition == "square") {
      trial.form = expInfo.DESIGN.CONDITIONS[1];
    }

    if (trial.positionX == -100) {
      trial.X = expInfo.DESIGN.POSITIONS.X[0];
    } else if (trial.positionX == -75) {
      trial.X = expInfo.DESIGN.POSITIONS.X[1];
    } else if (trial.positionX == -50) {
      trial.X = expInfo.DESIGN.POSITIONS.X[2];
    } else if (trial.positionX == 0) {
      trial.X = expInfo.DESIGN.POSITIONS.X[3];
    } else if (trial.positionX == 50) {
      trial.X = expInfo.DESIGN.POSITIONS.X[4];
    } else if (trial.positionX == 75) {
      trial.X = expInfo.DESIGN.POSITIONS.X[5];
    } else if (trial.positionX == 100) {
      trial.X = expInfo.DESIGN.POSITIONS.X[6];
    }

    if (trial.positionY == -100) {
      trial.Y = expInfo.DESIGN.POSITIONS.Y[0];
    } else if (trial.positionY == -75) {
      trial.Y = expInfo.DESIGN.POSITIONS.Y[1];
    } else if (trial.positionY == -50) {
      trial.Y = expInfo.DESIGN.POSITIONS.Y[2];
    } else if (trial.positionY == 0) {
      trial.Y = expInfo.DESIGN.POSITIONS.Y[3];
    } else if (trial.positionY == 50) {
      trial.Y = expInfo.DESIGN.POSITIONS.Y[4];
    } else if (trial.positionY == 75) {
      trial.Y = expInfo.DESIGN.POSITIONS.Y[5];
    } else if (trial.positionY == 100) {
      trial.Y = expInfo.DESIGN.POSITIONS.Y[6];
    }

    trial.stimulus = generateStims(
      trial.form,
      trial.X,
      trial.Y,
    );
    trial.trial_number = i + 1;
  });
  
  
  return block_conditions;
}