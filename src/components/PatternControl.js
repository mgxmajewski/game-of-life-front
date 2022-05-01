import React, {useState} from 'react';
import '../styles/pattern.css'
import {coordinatesBtn} from "../styles/grid.module.css";
import {useReactiveVar} from "@apollo/client";
import {fetchHandler, useFetch} from "../utils/useFetch";
import {authenticatedToken} from "../utils/cache";
import {patternControlButton} from "../styles/buttons.module.css"


const PatternControl = () => {

    const currentToken = useReactiveVar(authenticatedToken);
    const [freshGridSize, setFreshGridSize] = useState('25');
    const [patternToLoad, setPatternToLoad] = useState('0');

    const fetchPatterns = useFetch(`all-patterns/get`, 'GET', currentToken)

    const loadPattern = (e) => {
        e.preventDefault()
        fetchHandler(`pattern/${patternToLoad}`, 'GET', currentToken)
    }

    const loadEmptyGrid = (e) => {
        e.preventDefault()
        fetchHandler(`initiate-clean-grid/${freshGridSize}`, 'GET', currentToken)
    }


    const patternList = fetchPatterns.response;
    const isListLoading = !patternList;

    return (
        <div className="pattern-container gradient-background-with-shadow">
            <div className="fresh-grid-container">
                <button
                    className={coordinatesBtn}
                    onClick={(e) => loadEmptyGrid(e)}
                >
                    Load Empty Grid
                </button>
                <form className="fresh-grid-form">
                    <div className="fresh-grid-size">
                        <label htmlFor="col-quantity">
                            grid size
                            <input
                                onChange={e => setFreshGridSize(e.target.value)}
                                type="number"
                                id="col-quantity"
                                defaultValue={`${freshGridSize}`}
                                name="quantity"
                                min="1"
                                max="100"
                            />
                        </label>
                    </div>
                </form>
            </div>
            {isListLoading
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
            <button
                className={coordinatesBtn}
                onClick={(e) => loadPattern(e)}
            >
                Load Pattern
            </button>
        </div>
    );
}

export default PatternControl;