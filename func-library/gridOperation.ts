
/** filter numbers around the target number
 * 
 * @param series a series of numbers
 * @param target a number
 * @param ncol number of columns
 * @param distance the distance between the target number and the numbers to be filtered
 * @returns 
 */
export function filterNumbersAround(series: number[], target: number, ncol: number, distance: number = 1): number[] {

    // Get the balance and quotient of the target number
    const target_balance = target % ncol;
    const target_quotient = Math.floor(target / ncol);

    // Initialize the results array
    let results: number[] = [];

    // Loop through each number in the series
    for (let num of series) {

        // Get the balance and quotient of the current number
        const num_balance = num % ncol;
        const num_quotient = Math.floor(num / ncol);

        // If the current number is NOT within the target number's distance,
        // then add it to the results array
        if (!(Math.abs(num_balance - target_balance) <= distance && Math.abs(num_quotient - target_quotient) <= distance)) {
            results.push(num);
        }
    }

    return results;
}

