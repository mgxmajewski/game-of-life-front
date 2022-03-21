

import {authenticatedToken} from "./cache"
import {navigate} from "gatsby";

const fetch = require(`node-fetch`)

/**
 * @param {string} api
 * @param {string} token
 * @param {[]} grid
 * @param {string} creator
 * @param {string} snapshotName
 */
export const saveGridSnapshot = async (api, token, creator, snapshotName, grid) => {
    // console.log(`authenticatedToken(): ` + authenticatedToken());
    const myHeaders = {
        "Authorization": `${token}`,
        "Content-Type": "application/json"
    };

    const raw = JSON.stringify({
        "creator": creator,
        "snapshot_name": snapshotName,
        "pattern": grid
    });

    const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        credentials: 'include'
    };

    return fetch(`${process.env.GATSBY_API_URL}/${api}`, requestOptions)
        .then(response => {
            if (response.status === 401) {
                authenticatedToken([])
                navigate(`/sign-in`)
            }
            return response
        })
        .then(response => response.text())
        // .then((text) => console.log(text))
        .catch(error => console.log('Fetch error', error));
}


