import {wsClient} from "../apollo/client";
import {navigate} from "gatsby";
import {authenticatedToken, userIdVar} from "./cache";

const fetch = require(`node-fetch`)

export const handleLogout = () => {

    const myHeaders = {
        // "Authorization": `${authHeader}`,
        'Content-Type': 'application/json',
        // 'Access-Control-Allow-Origin': '*'
    };

    const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        mode: 'cors', // no-cors, *cors, same-origin
        redirect: 'follow',
        credentials: 'include'
    };

    fetch(`${process.env.GATSBY_API_URL}/user/logout`, requestOptions)
        .then(response => response.text())
        .then((response) => console.log(`Login ${response}`))
        .then(() => authenticatedToken([]))
        .then(() => userIdVar([]))
        .then(() => localStorage.clear())
        .then(() => wsClient.close(false))
        .then(() => navigate(`/`))
        .catch(error => console.log('error', error));
}
