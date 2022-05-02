import React, {useEffect, useState, useCallback} from 'react';
import {playGridButton, playContainer, intervalForm} from '../styles/play.module.css'
import {showCoordinates} from "../utils/cache";
import {mutateGridState} from "../utils/MutateGridState";
import {genericButton} from "../styles/global.module.css";



const PlayControl = props => {

    const {currentToken} = props

    const [refreshInterval, setRefreshInterval] = useState('1000')
    const [isIntervalActive, setIsIntervalActive] = useState(false)

    const sendIntervalToServer = useCallback((routeString)=> {
        mutateGridState(`${routeString}`, currentToken)
    }, [currentToken])

    const startInterval = (e) => {
        setIsIntervalActive(true)
        playGridHandler(e, `state/${refreshInterval}`)
    }

    const stopInterval = (e) => {
        setIsIntervalActive(false)
        playGridHandler(e, `state/101`)
    }

    const playGridHandler = (e, routeString) => {
        e.preventDefault();
        sendIntervalToServer(`${routeString}`)
    }

    useEffect(()=> {
        console.log(isIntervalActive)
        if (isIntervalActive=== true) {
            sendIntervalToServer(`state/${refreshInterval}`)
        }
    },[refreshInterval, isIntervalActive, sendIntervalToServer])

    const toggleDisplayCoordinates = () => {
        showCoordinates()[0] === false
            ? showCoordinates([true])
            : showCoordinates([false])
    }

    return (
        <div className={playContainer}>
            <button
                className={`${genericButton} ${playGridButton}`}
                onClick={toggleDisplayCoordinates}
            >
                Show Coordinates
            </button>
            <button
                className={`${genericButton} ${playGridButton}`}
                onClick={e => playGridHandler(e, 'next-state/')}
            >
                Next Frame
            </button>
            <form className={intervalForm}>
                <label htmlFor="set-interval">Set
                    <select
                        name="interval"
                        id="set-interval"
                        defaultValue="1000"
                        onChange={e => setRefreshInterval(e.target.value)}
                    >
                        <option value="50">.05s</option>
                        <option value="100">.1s</option>
                        <option value="200">.2s</option>
                        <option value="500">.5s</option>
                        <option value="1000">1s</option>
                        <option value="2000">2s</option>
                        <option value="3000">3s</option>
                        <option value="5000">5s</option>
                    </select>
                    interval
                </label>
            </form>
            <button
                className={`${genericButton} ${playGridButton}`}
                onClick={e => startInterval(e)}
            >
                Start Interval
            </button>
            <button
                className={`${genericButton} ${playGridButton}`}
                onClick={e => stopInterval(e)}
            >
                Stop Interval
            </button>
        </div>
    );
}

export default PlayControl;