import {wsClient} from "../apollo/client";
import {navigate} from "gatsby";
import {authenticatedToken, userIdVar, userMailNameVar} from "./cache";
import jwt_decode from 'jwt-decode';

const fetch = require(`node-fetch`)
const {btoa} = require('abab');

export const handleLogin = (props) => {

    const {email, password} = props
    const userNameFromEmail = email.split("@")[0]
    const authHeader = 'Basic ' + btoa(`${email}:${password}`)
    console.log(authHeader)

    const myHeaders = {
        "Authorization": `${authHeader}`,
        "Content-Type": "application/json"
    };

    const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        // redirect: 'follow',
        credentials: 'include'
    };

    fetch("http://localhost:3000/user/login", requestOptions)
        .then(response => response.text())
        .then((response) => authenticatedToken([response]))
        .then(() => userIdVar([jwt_decode(authenticatedToken()[0]).id]))
        .then(() => console.log(`Login ${authenticatedToken()}`))
        .then(() => localStorage.setItem('userName', `${userNameFromEmail}`))
        .then(() => wsClient    .close(true))
        .then(() => navigate(`/grid`))
        .catch(error => console.log('error', error));
}

export const isLoggedIn = () => {
    const token = authenticatedToken()[0]
    return !!token
}
