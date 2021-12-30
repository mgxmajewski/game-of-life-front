import React, {useState} from 'react';
import '../styles/pattern.css'
import {coordinatesBtn} from "../styles/grid.module.css";
import {useReactiveVar} from "@apollo/client";
import {fetchHandler, useFetch} from "../utils/useFetch";
import {authenticatedToken} from "../utils/cache";


const PatternControl = () => {

    const currentToken = useReactiveVar(authenticatedToken);
    const [patternToLoad, setPatternToLoad] = useState('0');

    const fetchPatterns = useFetch(`all-patterns/get`, 'GET', currentToken)
    const loadPattern = (e) => {
        e.preventDefault()
        fetchHandler(`pattern/${patternToLoad}`, 'GET', currentToken)
    }

    const isListLoaded = !fetchPatterns.response
    const patternList = fetchPatterns.response;

    return (
        <div className="pattern-container">
            <button
                className={coordinatesBtn}
                onClick={(e) => loadPattern(e)}
            >
                Load Pattern
            </button>
            {isListLoaded
                ? <p>Loading patterns from the server</p>
                :
                <select
                    className="pattern-select"
                    size="3"
                    onChange={e => setPatternToLoad(e.target.value)}
                >
                    {patternList.map((option) => (
                        <option key={option.id} value={option.id}>{option.patternName}</option>
                    ))}
                </select>
            }
        </div>
    );
}

export default PatternControl;