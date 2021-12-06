import {authenticatedToken} from "./cache"
import {navigate} from "gatsby";

const fetch = require(`node-fetch`)

export const fetchFreshToken = async () => {

    const myHeaders = {
        "Content-Type": "application/json"
    };

    const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        // redirect: 'follow',
        credentials: 'include'
    };

    fetch("http://localhost:3000/user/refresh-token", requestOptions)
        .then(response => {
            if (response.status === 401) {
                // authenticatedToken([])
                navigate(`/sign-in`)
            }
            return response
        })
        .then(response => response.text())
        .then((response) => authenticatedToken([response]))
        .then((text) => console.log(text))
        .catch(error => console.log('Fetch error', error));
}


