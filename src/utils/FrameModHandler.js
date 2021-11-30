/** Handles sending mutation to graphQL with updated grid
 * @param grid
 * @param coordinates
 */

import { authenticatedToken } from "./cache"
const fetch = require(`node-fetch`)

export const frameModHandler = async (grid, coordinates) => {

    const myHeaders = {
    "Authorization": `${authenticatedToken()}`,
    "Content-Type": "application/json"
    };

    const raw = JSON.stringify({
        "grid": grid,
        "cell": coordinates
    });

    const requestOptions = {
        method: 'POST',
        headers:  myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch("http://localhost:3000/mutate-grid/", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
}


