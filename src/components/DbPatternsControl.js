import React, {useState} from 'react';
import {
    patternContainer,
    freshGridContainer,
    freshGridForm,
    freshGridSizeInput,
    patternSelect, replayContainer
} from '../styles/patterns-control.module.css'
import {coordinatesBtn} from "../styles/grid.module.css";
import {useReactiveVar} from "@apollo/client";
import {fetchHandler, useFetch} from "../utils/useFetch";
import {authenticatedToken} from "../utils/cache";
import {genericButton, gradientBackgroundWithShadow} from "../styles/global.module.css";

const DbPatternsControl = () => {

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
        <div
            // className="pattern-container gradient-background-with-shadow"
            className={`${patternContainer} ${gradientBackgroundWithShadow}`}
        >
            <h2>Patterns from conwaylife.com DB or fresh start =></h2>
            <div className={freshGridContainer}>
                <button
                     className={`${genericButton} ${coordinatesBtn}`}
                    onClick={(e) => loadEmptyGrid(e)}
                >
                    Load Empty Grid
                </button>
                <form className={freshGridForm}>
                    <div className={freshGridSizeInput}>
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
                    className={patternSelect}
                    size="3"
                    onChange={e => setPatternToLoad(e.target.value)}
                >
                    {patternList.map((option) => (
                        <option key={option.id} value={option.id}>{option.patternName}</option>
                    ))}
                </select>
            }
            <button
                 className={`${genericButton} ${coordinatesBtn}`}
                onClick={(e) => loadPattern(e)}
            >
                Load Pattern
            </button>
        </div>
    );
}

export default DbPatternsControl;