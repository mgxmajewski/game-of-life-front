import React, {useEffect, useState} from 'react';
import PropTypes from "prop-types";
import {navigate} from "gatsby";
import {authenticatedToken, userIdVar} from "../utils/cache";
import jwt_decode from 'jwt-decode';
import {wsClient} from "../apollo/client";
import {useReactiveVar} from "@apollo/client";

const fetch = require(`node-fetch`)


const subMinutes = function (dt, minutes) {
    return new Date(dt.getTime() - minutes * 60000);
}


const isExpired = (token) => {
    const token_expiry = jwt_decode(token).exp * 1000
    return new Date(token_expiry) <=
        new Date()
}

const AuthSync = (props) => {
    const [isFetching, setIsFetching] = useState(true)

    const currentToken = useReactiveVar(authenticatedToken)
    const isToken = () => {
        return !!currentToken
    }

    const isValidLongerThanMinute = (token) => {
        const token_expiry = jwt_decode(JSON.stringify(token)).exp * 1000
        return subMinutes(new Date(token_expiry), 1) >=
            new Date()
    }
    useEffect(() => {

        if (isToken()) {
            setIsFetching(false)
        }
        asyncToken();
        const refreshInterval = setInterval(() => {
            if (!isValidLongerThanMinute(currentToken)) {
                asyncToken()
            }
        }, 5000)
        window.addEventListener('storage', () => console.log('add storage changed'))
        return () => {
            window.removeEventListener('storage', () => console.log('Remove storage changed'))
            clearInterval(refreshInterval)
        }
    }, [isFetching]);

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
            .then(() => wsClient.close(false))
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
