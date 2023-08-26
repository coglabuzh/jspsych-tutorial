# Blank Template

This is a template for a new experiment created by jsPsych-builder.

To use the Template:

1. Clone the repository to your local machine.
2. Rename the folder to the name of the new experiment.
3. Make sure that Node.js (https://nodejs.org/en/) and jsPsych-builder (https://github.com/bjoluc/jspsych-builder) have installed on your machine.
4. Run `npm install` to install dependencies.
5. Programming your own experiment.
6. Run `npm start`. After building the project, a browser window will open with the experiment at `localhost:3000`.
7. Debug your experiment.
8. run `npm run build` to build the project for production.

## Experiment.ts

This is the main entry point for the experiment. It is responsible for creating the experiment, and running it. It imports trials from the `trials` folder and concatenates them in a timeline.
