import React, {useEffect} from "react";
import {authenticatedToken} from "./cache";
import {navigate} from "gatsby";

/**
 * fetchHandler constructs request options object and url string to asynchronously
 * fetch data and return response as promise.
 * @param apiRoute - api url parameter
 * @param method - string http request method
 * @param currentToken - auth token
 * @returns {Promise<T>}
 */

export const fetchHandler = async (apiRoute, method, currentToken) => {

    const myHeaders = {
        "Authorization": `${currentToken}`,
        "Content-Type": "application/json"
    };

    const requestOptions = {
        method: `${method}`,
        headers: myHeaders,
        credentials: 'include'
    };
    return await fetch(`${process.env.GATSBY_API_URL}/${apiRoute}`, requestOptions)
        .then(response => {
            if (response.status === 401) {
                authenticatedToken([])
                navigate(`/sign-in`)
            }
            return response
        });
}

export const useFetch = (apiRoute, method, currentToken) => {

    const [response, setResponse] = React.useState(null);
    const [error, setError] = React.useState(null);
    const [isLoading, setIsLoading] = React.useState(false);


    useEffect(() => {

        const fetchData = async () => {
            setIsLoading(true);
            try {
                const res = await fetchHandler(`${apiRoute}`, method, currentToken);
                const json = await res.json();

                setResponse(json);
                setIsLoading(false);
            } catch (error) {
                setError(error);
            }
        };

        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    const reFetch = async () => {
        setIsLoading(true);
        try {
            const res = await fetchHandler(`${apiRoute}`, method, currentToken);
            const json = await res.json();

            setResponse(json);
            setIsLoading(false);
        } catch (error) {
            setError(error);
        }
    }


    return {response, error, isLoading, reFetch};
};
