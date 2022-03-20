import React, {useEffect, useState} from 'react';
import PropTypes from "prop-types";
import {navigate} from "gatsby";
import {authenticatedToken, userIdVar} from "../utils/cache";
import jwt_decode from 'jwt-decode';
import {wsClient} from "../apollo/client";

const fetch = require(`node-fetch`)

const subMinutes = function (dt, minutes) {
    return new Date(dt.getTime() - minutes * 60000);
}

const AuthSync = (props) => {
    const [isFetching, setIsFetching] = useState(true)

    const isToken = () => {
        return !!authenticatedToken()[0]
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
        if (!isToken()) {
            asyncToken();
        }
        const refreshInterval = setInterval(() => {
            if (!isValidLongerThanMinute(authenticatedToken()[0])) {
                console.log(`'is about to expire': `);
                asyncToken()
            }
        }, 5000)
        window.addEventListener('storage', () => console.log('add storage changed'))
        return () => {
            window.removeEventListener('storage', () => console.log('Remove storage changed'))
            clearInterval(refreshInterval)
        }
    }, []);

    const asyncToken = async () => {

        const myHeaders = {
            "Content-Type": "application/json",
            'Access-Control-Allow-Origin': '*'
        };

        const requestOptions = {
            method: 'POST',

            headers: myHeaders,
            redirect: 'follow',
            credentials: 'include'
        };

        fetch(`${process.env.GATSBY_API_URL}/user/refresh-token`, requestOptions)
            .then(response => {
                if (response.status === 401) {
                    authenticatedToken([])
                    navigate(`/sign-in`)
                }
                return response
            })
            .then(response => response.text())
            .then((response) => authenticatedToken([response]))
            .then(() => userIdVar([jwt_decode(JSON.stringify(authenticatedToken()[0])).id]))
            .then(() => console.log(userIdVar()[0]))
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
