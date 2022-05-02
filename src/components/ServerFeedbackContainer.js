import React from 'react';
import ServerMessages from "./ServerMessages";
import {gradientBackgroundWithShadow} from "../styles/global.module.css"

const ServerFeedbackContainer = () => {
    return (
        <div className={gradientBackgroundWithShadow}>
            <h3>Server messages</h3>
            <ServerMessages/>
        </div>
    );
};

export default ServerFeedbackContainer;