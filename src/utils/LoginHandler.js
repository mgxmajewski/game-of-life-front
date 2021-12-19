import {wsClient} from "../apollo/client";
import {navigate} from "gatsby";
import {authenticatedToken, userIdVar, userMailNameVar} from "./cache";
import jwt_decode from 'jwt-decode';

const fetch = require(`node-fetch`)
const {btoa} = require('abab');

export const handleSignIn = (props) => {

    const {email, password} = props
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

    return fetch("http://localhost:3000/user/login", requestOptions)
        .then(response => response.json())
        .catch(error => console.log('error', error));
}

export const loadAndRedirectSignedInUser = (response, email) => {
    authenticatedToken([response['accessToken']])
    userIdVar([jwt_decode(authenticatedToken()[0]).id])
    console.log(`Login ${authenticatedToken()}`)
    localStorage.setItem('userName', `${email}`)
    wsClient.close(false)
    navigate(`/grid`)
}

export const isLoggedIn = () => {
    const token = authenticatedToken()[0]
    return !!token
}
