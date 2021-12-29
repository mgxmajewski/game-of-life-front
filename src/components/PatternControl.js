import React, {useEffect, useState} from 'react';
import '../styles/pattern.css'
import {coordinatesBtn} from "../styles/grid.module.css";
import {useReactiveVar} from "@apollo/client";
import {authenticatedToken} from "../utils/cache";
import {navigate} from "gatsby";


const PatternControl = () => {

    const apiRoute = 'all-patterns/get';
    const currentToken = useReactiveVar(authenticatedToken);
    const [patternNames, setPatternNames] = useState();
    const [isFetching, setIsFetching] = useState(true);
    const [patternToLoad, setPatternToLoad] = useState('0');

    useEffect(() => {
        fetchPattern()
    }, [])

    const loadPattern = (e) => {
        e.preventDefault()
        const myHeaders = {
            "Authorization": `${currentToken}`,
            "Content-Type": "application/json"
        };

        const requestOptions = {
            method: 'GET',
            headers: myHeaders,
            credentials: 'include'
        };

        fetch(`http://localhost:3000/pattern/${patternToLoad}`, requestOptions)
            .then(response => {
                if (response.status === 401) {
                    authenticatedToken([])
                    navigate(`/sign-in`)
                }
                return response
            })
            .then(response => response.json())
            .catch(error => console.log('Fetch error', error));
    }

    const fetchPattern = async () => {

        const myHeaders = {
            "Authorization": `${currentToken}`,
            "Content-Type": "application/json"
        };

        const requestOptions = {
            method: 'GET',
            headers: myHeaders,
            credentials: 'include'
        };

        fetch(`http://localhost:3000/${apiRoute}`, requestOptions)
            .then(response => {
                if (response.status === 401) {
                    authenticatedToken([])
                    navigate(`/sign-in`)
                }
                return response
            })
            .then(response => response.json())
            .then(patternList => setPatternNames(patternList))
            .then(() => setIsFetching(false))
            .catch(error => console.log('Fetch error', error));
    }

    return (
        <div className="pattern-container">
            <button
                className={coordinatesBtn}
                onClick={(e)=> loadPattern(e)}
            >
                Load Pattern
            </button>
            {isFetching
                ? <p>Loading</p>
                : <select
                    className="pattern-select"
                    size="3"
                    onChange={e => setPatternToLoad(e.target.value)}
                >
                    {patternNames.listPatterns.map((option) => (
                        <option value={option.id}>{option.patternName}</option>
                    ))}
                </select>
            }
        </div>
    );
}

export default PatternControl;