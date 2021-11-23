// import client from '@apollo/client'
import {authenticatedToken} from "./cache";
import {wsClient} from "../apollo/client";
// import {wsClient} from "../apollo/client";
// import {client} from "../apollo/client";


const fetch = require(`node-fetch`)
const {btoa} = require('abab');

export const handleLogin = async (email, password) => {

    const authHeader = 'Basic ' + btoa('popo4@gmail.com:tester123')
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

    await fetch("http://localhost:3000/user/login", requestOptions)
        .then(response => response.text())
        // .then(token => localStorage.setItem('Authorization', `${token}`))
        .then(result => authenticatedToken([result]))
        .then(() => console.log(`Login ${authenticatedToken()}`))
        .then(() => wsClient.close(true))
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

