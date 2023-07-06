

/** Calculate the angle of the mouse relative to the center of the color wheel, range from 0 to 360
 * 
 * @param mouseX: The x coordinate of the mouse
 * @param mouseY: The y coordinate of the mouse 
 * @param centerX: The x coordinate of the center of the color wheel
 * @param centerY: The y coordinate of the center of the color wheel
 * @returns The angle of the mouse relative to the center of the color wheel, range from 0 to 360
 */
export function calAngle(mouseX: number, mouseY: number, center:number[]): number {

  // 1. Calculate the distance between the center of the canvas and the mouse's x and y position
  const deltaX = mouseX - center[0];
  const deltaY = mouseY - center[1];

  // 2. Calculate the angle between the center of the canvas and the mouse's x and y position
  const angleInRadians = Math.atan2(deltaY, deltaX);
  const angleInDegrees = angleInRadians * (180 / Math.PI);

  return angleInDegrees;

}