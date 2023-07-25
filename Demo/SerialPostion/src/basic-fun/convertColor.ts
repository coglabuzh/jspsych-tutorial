
/** Convert hsl color to hex color
 * 
 * @param h hue, range from 0 to 360
 * @param s saturation, range from 0 to 100
 * @param l lightness, range from 0 to 100
 * @returns string of hex color
 */
export function hslToHex(h:number, s:number = 100, l:number = 50) {
    // Convert hue to a value between 0 and 1
    h /= 360;
    // Convert saturation to a value between 0 and 1
    s /= 100;
    // Convert lightness to a value between 0 and 1
    l /= 100;
  
    var r:number, g:number, b:number;
  
    // If saturation is 0, the color is a shade of gray
    if (s === 0) {
      // In this case, R, G, and B all have the same value
      r = g = b = l;
    } else {
      // Otherwise, calculate the color based on the hue
      var hue2rgb = function hue2rgb(p, q, t) {
        // If the hue is less than 0, add 1
        if (t < 0) t += 1;
        // If the hue is greater than 1, subtract 1
        if (t > 1) t -= 1;
        if (t < 1 / 6) return p + (q - p) * 6 * t;
        if (t < 1 / 2) return q;
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
        return p;
      };
  
      // Calculate the values of R, G, and B
      var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      var p = 2 * l - q;
      r = hue2rgb(p, q, h + 1 / 3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1 / 3);
    }
  
    // Convert the values to hexadecimal
    var toHex = function(x) {
      var hex = Math.round(x * 255).toString(16);
      // If the hexadecimal value is one digit, add a 0 in front of it
      return hex.length === 1 ? "0" + hex : hex;
    };
  
    // Convert the values of R, G, and B to hexadecimal
    var hexR = toHex(r);
    var hexG = toHex(g);
    var hexB = toHex(b);
      
    return "#" + hexR + hexG + hexB;

}