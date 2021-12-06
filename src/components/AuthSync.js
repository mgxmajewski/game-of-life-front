import React, {useEffect, useState} from 'react';
import PropTypes from "prop-types";
import {isLoggedIn} from "../utils/LoginHandler";
import {navigate} from "gatsby";
// import {fetchFreshToken} from "../utils/fetchFreshToken";
import {authenticatedToken, userIdVar} from "../utils/cache";
import jwt_decode from "jwt-decode";
import {wsClient} from "../apollo/client";
const fetch = require(`node-fetch`)

const isToken = () => {
    const token = authenticatedToken()[0]
    return !!token
}


const AuthSync = (props) => {
    const [isFetching, setIsFetching] = useState(true)

     useEffect(() => {
    // You need to restrict it at some point
    // This is just dummy code and should be replaced by actual
    if (!isToken()) {
        asyncToken();
    } else {
        setIsFetching(false)
    }
  }, []);

    const asyncToken = async () => {

    const myHeaders = {
        "Content-Type": "application/json"
    };

    const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        redirect: 'follow',
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
        .then(() => userIdVar([jwt_decode(authenticatedToken()[0]).id]))
        .then(() => console.log(userIdVar()))
        .then(() => wsClient.close(true))
        .then(()=> setIsFetching(false))
        .catch(error => console.log('Fetch error', error));
    }
    return (
        <>
            {isFetching
                ? <p>loading</p>
                : <> {props.children} </>
            }
        </>
    );
};

// AuthSync.propTypes = {
//     children: PropTypes.node
// };

export default AuthSync;
