/** Function to fetch and parse the JSON file
 * 
 * @param path{string} The path to the JSON file
 */
function fetchAndParseJSON(path: string) {
    fetch(path)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then((data) => {

            return data;

        })
        .catch(error => {
            console.error('Error fetching JSON:', error);
        });
}