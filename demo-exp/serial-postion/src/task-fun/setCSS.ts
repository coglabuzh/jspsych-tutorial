// Third party plugins
import jss from "jss-browserify";

var winW = Math.min(window.innerWidth, window.innerHeight * 1.5);
var Width = Math.min(winW * 0.95, 1200);
var fontSize = Width * 0.02;

export const setCSS = function () {
  jss.set(".main", {
    width: `${Width}px`,
    "font-size": `${fontSize}px`,
    "font-family": "Arial",
    margin: "0 auto",
    "text-align": "left",
    padding: "0.5em 0.5em",
    "line-height": "2em",
  });

  jss.set(".title", {
    "font-size": `${fontSize * 2}px`,
    "font-family": "Arial",
    color: "#0d3b83",
    "text-align": "center",
    padding: "0.5em 1em",
    "margin-top": "100px",
  });

  jss.set(".body-center", {
    "text-align": "center",
  });

  jss.set(".image", {
    float: "center",
    width: `${Width}px`,
  });

  jss.set(".subtitle", {
    "font-size": `${fontSize * 1.2}px`,
    "font-family": "Arial",
  });

  jss.set(".fb-text", {
    width: `${Width}px`,
    "text-align": "center",
    "font-size": `${fontSize * 1.5}px`,
    "font-family": "Arial",
    margin: "0 auto",
    padding: "0.5em 0.5em",
    "line-height": "2em",
  });

  jss.set(".button", {
    "font-size": `${fontSize}px`,
    "font-family": "Arial",
    "text-align": "center",
    padding: "0.3em 0.3em",
    "border-radius": "15px",
    "background-color": "#0D8CB7",
    border: "2px solid #1E1E1E",
    "justify-content": "center",
    "margin-bottom": "50px",
  });

  jss.set(".jspsych-btn", {
    "font-size": `${fontSize}px`,
    "font-family": "Arial",
    "text-align": "center",
    padding: "0.3em 0.3em",
    "border-radius": "15px",
    "background-color": "#0D8CB7",
    border: "2px solid #1E1E1E",
    "justify-content": "center",
    "margin-bottom": "50px",
  });

  jss.set(".input-box", {
    "font-size": "1em",
    "font-family": "Arial",
    border: "2px solid black",
    width: "8em",
    "text-align": "center",
    "justify-content": "center",
  });

  jss.set(".text-box", {
    width: `${Width * 0.8}px`,
    "font-size": "1em",
    "font-family": "Arial",
  });
};

export function createButtonMatrix(
  nrow: number,
  ncol: number,
  mWidth: number = 30,
  mHeight: number = 40
) {
  const nTotal = nrow * ncol;

  let buttonCSS: string[] = [];

  for (let i = 0; i < nTotal; i++) {
    let button_name = `.alter-button${i + 1}`;
    let class_name = `alter-button${i + 1}`;

    let button_row = Math.floor(i / ncol);
    let button_col = i % ncol;

    let button_x = (mWidth / (ncol - 1)) * button_col + 75 - mWidth / 2;
    let button_y = (mHeight / (nrow - 1)) * button_row + 50 - mHeight / 2;

    jss.set(button_name, {
      position: "absolute",
      top: `${button_y}%`,
      left: `${button_x}%`,
      width: "6%",
      "-webkit-transform": "translate(-50%,-50%)",
      "-moz-transform": "translate(-50%,-50%)",
      transform: "translate(-50%,-50%)",
      "font-size": `${fontSize * 2.5}px`,
      "font-family": "Arial",
      "text-align": "center",
      padding: "0.3em 0.3em",
      "border-radius": "15px",
      "background-color": "#FFFFFF",
      border: "2px solid #1E1E1E",
      "justify-content": "center",
      "margin-bottom": "50px",
    });

    buttonCSS.push(`<button class=${class_name}>%choice%</button>`);
  }

  return buttonCSS;
}
