/**
 * 
 * @param pos_list An array of (x, y) coordinates.
 * @param color_list An array of colors.
 * @param width A number specifying the width of the rectangles.
 * @returns An array of screen elements.
 */
export function colorFrames(pos_list: number[][], color_list: string[], width: number): object[] {
  // Initialize an empty array to store the screen elements.
  var screen_elements: object[] = [];

  // Generate the screen elements.
  for (let i of Array(pos_list.length).keys()) {
    // Calculate the (x, y) coordinates of the current screen element.
    let position = pos_list[i];
    let color = color_list[i];

    // Create a rectangle object for the current screen element.
    var Rect = {
      obj_type: "rect",
      startX: position[0],
      startY: position[1],
      width: width,
      height: width,
      fill_color: color,
      line_color: "black",
      line_width: 2,
    };
    screen_elements.push(Rect);
  }
  // Return the array of screen elements.
  return screen_elements;
}