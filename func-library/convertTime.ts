/**
 * Converts time between milliseconds, seconds, and minutes.
 * @author Hannah Tschannen 
 * @param {number} input - The value to be converted.
 * @param {string} input_unit - The unit of the input value ('ms', 's', or 'min').
 * @param {string} convert_to - The desired conversion type ('ms', 's', or 'min').
 * @returns {number|string} - The converted value, or an error message if the conversion is invalid.
 */
export const convertTime = function (
  input: number,
  input_unit: string,
  convert_to: string
) {
  if (input_unit === "ms") {
    if (convert_to === "s") {
      return input / 1000;
    } else if (convert_to === "min") {
      return input / 60000;
    }
  } else if (input_unit === "s") {
    if (convert_to === "ms") {
      return input * 1000;
    } else if (convert_to === "min") {
      return input / 60;
    }
  } else if (input_unit === "min") {
    if (convert_to === "ms") {
      return input * 60000;
    } else if (convert_to === "s") {
      return input * 60;
    }
  }

  return "Invalid conversion. Please check the input units and conversion type.";
};
