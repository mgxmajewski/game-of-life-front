import React, {useEffect, useState} from 'react';
import PropTypes from "prop-types";
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

const subMinutes = function (dt, minutes) {
    return new Date(dt.getTime() - minutes * 60000);
}

const isValidLongerThanMinute = (token) => {
    const token_expiry = jwt_decode(token).exp * 1000
    return subMinutes(new Date(token_expiry), 1) >=
        new Date()
}

const isExpired = (token) => {
    const token_expiry = jwt_decode(token).exp * 1000
    return new Date(token_expiry) <=
        new Date()
}

const AuthSync = (props) => {
    const [isFetching, setIsFetching] = useState(true)

    useEffect(() => {
        const refreshInterval = setInterval( () => {
            if (!isToken()) {
                asyncToken();
            } else if (isExpired(authenticatedToken()[0])) {
                console.log('was expired');
                asyncToken()
            } else {
                setIsFetching(false)
            }
            console.log('refresh loop')

        }, 5000)
        window.addEventListener('storage', () => console.log('add storage changed'))

        return () => {
            window.removeEventListener('storage', () => console.log('Remove storage changed'))
            console.log('cleared')
            clearInterval(refreshInterval)
        }
    }, [authenticatedToken()[0]]);

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
            .then(() => setIsFetching(false))
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

AuthSync.propTypes = {
    children: PropTypes.node
};

export default AuthSync;
