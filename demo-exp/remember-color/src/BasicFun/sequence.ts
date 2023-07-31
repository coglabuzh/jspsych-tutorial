
/* generate a series of letters or numbers */
export const sequence = {

    /**
     *  generate a series of letters
     * @param capital logical; if true, an array of capitalized letters will be returned; if false, return uncapitalized letters.
     * @returns 
     */
    alphabet: function (capital: boolean = true) {
        // Create an empty array to store the generated letters
        const alphabet: string[] = [];

        // Use a ternary operator to check if the "capital" argument is true or false,
        // and set the starting ASCII code accordingly (65 for capital letters, 97 for lowercase letters)
        const num = capital ? 65 : 97;

        // Loop through 26 iterations (i.e., the 26 letters in the alphabet),
        // and use the "String.fromCharCode" method to convert the ASCII code to a letter.
        // Push each letter into the "alphabet" array.
        for (let i = 0; i < 26; i++) {
            alphabet.push(String.fromCharCode(num + i));
        }

        // Return the generated alphabet array
        return alphabet;
    },
    /**
     * generate a series of numbers
     * @param start a number; the minimum number of the series
     * @param end  a number; the maximum number of the series
     * @param step a number; the interval between each two numbers.
     * @returns 
     */
    number: function (start: number = 0, end: number, step: number = 1) {
        // Create an empty array to store the generated numbers
        let results: number[] = [];
        // Loop through numbers from "start" to "end-1",
        // incrementing by "step" each time,
        // and push each number into the "results" array.
        for (var i = start; i <= end; i = i + step) {
            results.push(i)
        }
        // Return the generated numeric array.
        return results;
    }
};
