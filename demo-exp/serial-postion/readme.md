# remember-forget-circle

This experiment relies on Node.js (https://nodejs.org/en/) and jsPsych-builder package (https://github.com/bjoluc/jspsych-builder). Please install the dependent package before running the experiment.

## How to run the experiment
- make sure you have (node)[https://nodejs.org/en/] installed
- run `npm install` to install dependencies
- run `npm run start`. After building the project, a browser window will open with the experiment at `localhost:3000`.

- run `npm run build` to build the project for production.


## Experiment.ts

This is the main entry point for the experiment. It is responsible for creating the experiment, and running it. It imports trials from the `trials` folder and concatenates them in a timeline.

#
