// import client from '@apollo/client'
import {wsClient} from "../apollo/client";
import {navigate} from "gatsby";
import {authenticatedResponse, authenticatedToken, userIdVar} from "./cache";
// import {wsClient} from "../apollo/client";
// import {client} from "../apollo/client";


const fetch = require(`node-fetch`)
const {btoa} = require('abab');

export const handleLogin = (props) => {

    const { email, password } = props
    const authHeader = 'Basic ' + btoa(`${email}:${password}`)
    console.log(authHeader)

    const myHeaders = {
        "Authorization": `${authHeader}`,
        "Content-Type": "application/json"
    };

    const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        redirect: 'follow'
    };

    fetch("http://localhost:3000/user/login", requestOptions)
        .then(response => response.json())
        // .then(token => localStorage.setItem('Authorization', `${token}`))
        .then(result => authenticatedResponse([result]))
        .then(() => authenticatedToken([authenticatedResponse()[0].token]))
        .then(() => userIdVar([authenticatedResponse()[0].userId]))
        .then(() => console.log(`Login ${authenticatedToken()}`))
        .then(() => wsClient.close(true))
        .then(() => navigate(`/grid`))
        .catch(error => console.log('error', error))


}


export const isLoggedIn = () => {
    const user = getUser()
    return !!user.username
}

export const isBrowser = () => typeof window !== "undefined"

export const getUser = () =>
    isBrowser() && window.localStorage.getItem("gatsbyUser")
        ? JSON.parse(window.localStorage.getItem("gatsbyUser"))
        : {}

// const setUser = user =>
//   window.localStorage.setItem("gatsbyUser", JSON.stringify(user))

