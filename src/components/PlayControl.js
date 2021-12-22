import React, {useEffect, useState} from 'react';
import '../styles/play.css'
import {coordinatesBtn} from "../styles/grid.module.css";
import {showCoordinates} from "../utils/cache";


const PlayControl = () => {

    const toggleDisplayCoordinates = () => {
        showCoordinates()[0] === false
            ? showCoordinates([true])
            : showCoordinates([false])
    }

    return (
        <div className="play-container">
            <button
                className={coordinatesBtn}
                onClick={toggleDisplayCoordinates}
            >
                Show Coordinates
            </button>
        </div>
    );
}

export default PlayControl;