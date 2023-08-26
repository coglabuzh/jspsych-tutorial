

/** A function that draws a color wheel on a canvas
 * 
 * @author Chenyu Li, ChatGPT
 * 
 * @param radius The radius of the color wheel
 * @param ratio The ratio of the inner radius to the outer radius
 * @param pos The center position of the color wheel
 * @returns A object of color wheel that can be used in jsPsych psychophysics plugin
 */
export function drawColorWheel(radius: number, ratio: number = 0.5, pos: [number, number]) {

    // Define the jsPsych object that will be returned
    const colorWheelObject = {
        obj_type: 'manual',
        startX: pos[0],
        startY: pos[1],
        drawFunc: function (stimulus, canvas, context) {

            // Get the center of the canvas
            const centerX = canvas.width/2
            const centerY = canvas.height/2

            // Draw the color wheel
            for (var angle = 0; angle < 360; angle += 1) {

                // Define the start and end angles
                var startAngle = (angle - 2) * Math.PI / 180;
                var endAngle = angle * Math.PI / 180;

                // Set the fill color based on the angle
                context.fillStyle = "hsl(" + angle + ", 80%, 50%)";

                // Draw a slice of the color wheel
                context.beginPath();
                context.moveTo(centerX, centerY);
                context.arc(centerX, centerY, radius, startAngle, endAngle);
                context.closePath();
                context.fill();

            }

            var innerRadius = radius*ratio; // Set the radius of the inner area
            // Set the global composite operation to "destination-out"
            context.globalCompositeOperation = "destination-out";

            // Draw a solid circle to clear the inner area
            context.fillStyle = "rgba(0, 0, 0, 1)"; // Set solid black color
            context.beginPath();
            context.arc(centerX, centerY, innerRadius, 0, 2 * Math.PI);
            context.closePath();
            context.fill();

            // Reset the global composite operation
            context.globalCompositeOperation = "source-over";

        }
    }

    // Return the jsPsych object
    return colorWheelObject

}
