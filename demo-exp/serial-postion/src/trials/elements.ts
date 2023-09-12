/**
 * Generates an array of screen elements (rectangles and text) for displaying stimuli.
 * @param {number} nBox - The number of item boxes to generate.
 * @param {Array} content - The content to display in the item boxes.
 * @param {number} cueBox - The index of the item boxes to highlight.
 * @param {Array} center - The (x, y) coordinates of the center of the display area.
 * @param {number} width - The width of the item boxes.
 * @param {number} radius - The radius of the display area.
 * @param {string} title - The title to display above the screen elements.
 * @returns {Array} An array of screen elements (rectangles and text).
 */
export function stimBoxes(
  nBox: number = 8,
  content: any[] = [],
  cueBox: number[] = [],
  center: number[],
  width: number,
  radius: number
) {
  // Calculate the angle between adjacent screen elements.
  let theta = (2 / nBox) * Math.PI;

  // Calculate the font and title styles based on the width of the screen elements.
  const fontStyle = width * 0.4 + "px Arial";

  // Initialize an empty array to store the screen elements.
  var screen_elements: any[] = [];

  // Generate the screen elements.
  for (let i of Array(nBox).keys()) {
    // Calculate the (x, y) coordinates of the current screen element.
    const posX = Math.sin(theta * (-2 - i)) * radius * 1.1 + center[0];
    const posY = Math.cos(theta * (-2 - i)) * radius + center[1];

    // Determine the border color and width based on whether the current screen element is the cue box.
    if (cueBox.includes(i)) {
      var borderColor = "red";
      var borderWidth = 5;
    } else {
      var borderColor = "black";
      var borderWidth = 3;
    }

    // Create a rectangle object for the current screen element.
    var Rect = {
      obj_type: "rect",
      startX: posX,
      startY: posY,
      width: width,
      height: width,
      line_color: borderColor,
      line_width: borderWidth,
    };
    screen_elements.push(Rect);

    // If there is content for the current screen element, create a text object for it.
    if (content[i] !== undefined) {
      if (content[i].includes(".")) {
        var Pic = {
          obj_type: "image",
          startX: posX,
          startY: posY,
          file: content[i],
          image_width: width,
        };

        // Push the picture into the slide
        screen_elements.push(Pic);
      } else {
        var Word: object = {
          obj_type: "text",
          startX: posX,
          startY: posY,
          content: content[i],
          font: fontStyle,
        };

        // Push the word into the slide
        screen_elements.push(Word);
      }
    }
  }

  // Return the array of screen elements.
  return screen_elements;
}
