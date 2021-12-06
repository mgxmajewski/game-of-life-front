// import {authenticatedToken, userIdVar} from "./cache"
// import {navigate} from "gatsby";
// import jwt_decode from "jwt-decode";
// import {wsClient} from "../apollo/client";
//
// const fetch = require(`node-fetch`)
//
// export const fetchFreshToken = async () => {
//
//     const myHeaders = {
//         "Content-Type": "application/json"
//     };
//
//     const requestOptions = {
//         method: 'POST',
//         headers: myHeaders,
//         redirect: 'follow',
//         credentials: 'include'
//     };
//
//     fetch("http://localhost:3000/user/refresh-token", requestOptions)
//         .then(response => {
//             if (response.status === 401) {
//                 // authenticatedToken([])
//                 navigate(`/sign-in`)
//             }
//             return response
//         })
//         .then(response => response.text())
//         .then((response) => authenticatedToken([response]))
//         .then(() => userIdVar([jwt_decode(authenticatedToken()[0]).id]))
//         .then(() => console.log(userIdVar()))
//         // .then(() => wsClient.close(true))
//         .catch(error => console.log('Fetch error', error));
// }
//
//
