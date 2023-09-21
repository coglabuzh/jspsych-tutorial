

/** convertCase takes an array of strings and converts each to lower case
 * or upper case. It returns an array of strings.
 * 
 * @param x an array of strings to convert.
 * @param output a string; the type of the output. It can be "lower", "upper", or "both".
 * @returns 
 */

export function convertCase(x: string[], output: string = "both") {

    // Create a new array that holds the upper case versions of each string
    const upperCaseArray = x.map(item => item.toUpperCase());

    // Create a new array that holds the lower case versions of each string
    const lowerCaseArray = x.map(item => item.toLowerCase());

    // if the output parameter is "lower", return the lower case array
    if (output === "lower") return lowerCaseArray;

    // if the output parameter is "upper", return the upper case array
    if (output === "upper") return upperCaseArray;

    // if the output parameter is "both", return the two arrays concatenated
    if (output === "both") return lowerCaseArray.concat(upperCaseArray);

}