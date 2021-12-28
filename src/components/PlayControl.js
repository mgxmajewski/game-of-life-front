import React, {useEffect, useState} from 'react';
import '../styles/play.css'
import {coordinatesBtn} from "../styles/grid.module.css";
import {showCoordinates} from "../utils/cache";
import {mutateGridState} from "../utils/MutateGridState";


const PlayControl = props => {

    const {currentToken} = props

    const [refreshInterval, setRefreshInterval] = useState('1000')
    const [isIntervalActive, setIsIntervalActive] = useState(false)

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
        mutateGridState(`${routeString}`, currentToken)
    }

    useEffect(()=> {
        console.log(isIntervalActive)
        if (isIntervalActive=== true) {
            mutateGridState(`state/${refreshInterval}`, currentToken)
        }
    },[refreshInterval, isIntervalActive])

    const toggleDisplayCoordinates = () => {
        showCoordinates()[0] === false
            ? showCoordinates([true])
            : showCoordinates([false])
    }

    return (
        <div className="play-container">
            <button
                className="control-button"
                onClick={toggleDisplayCoordinates}
            >
                Show Coordinates
            </button>
            <button
                className="control-button"
                onClick={e => playGridHandler(e, 'next-state/')}
            >
                Next Frame
            </button>
            <form className="interval-form">
                <label htmlFor="set-interval">Set
                    <select
                        name="interval"
                        id="set-interval"
                        onChange={e => setRefreshInterval(e.target.value)}
                    >
                        <option value="100">.1s</option>
                        <option value="200">.2s</option>
                        <option value="500">.5s</option>
                        <option selected value="1000">1s</option>
                        <option value="2000">2s</option>
                        <option value="3000">3s</option>
                        <option value="5000">5s</option>
                    </select>
                    interval</label>
            </form>
            <button
                className="control-button"
                onClick={e => startInterval(e)}
            >
                Start Interval
            </button>
            <button
                className="control-button"
                onClick={e => stopInterval(e)}
            >
                Stop Interval
            </button>
        </div>
    );
}

export default PlayControl;