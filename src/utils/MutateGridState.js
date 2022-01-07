/** Handles sending mutation to graphQL with updated grid
 * @param grid
 * @param coordinates
 */

import {authenticatedToken} from "./cache"
import {navigate} from "gatsby";

const fetch = require(`node-fetch`)

export const mutateGridState = async (api, token, grid, coordinates) => {
    // console.log(`authenticatedToken(): ` + authenticatedToken());
    const myHeaders = {
        "Authorization": `${token}`,
        "Content-Type": "application/json"
    };

    const raw = JSON.stringify({
        "grid": grid,
        "cell": coordinates
    });

    const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        // redirect: 'follow',
        credentials: 'include'
    };

    fetch(`${process.env.GATSBY_API_URL}/${api}`, requestOptions)
        .then(response => {
            if (response.status === 401) {
                authenticatedToken([])
                navigate(`/sign-in`)
            }
            return response
        })
        .then(response => response.text())
        .then((text) => console.log(text))
        .catch(error => console.log('Fetch error', error));
}


