import React from 'react';
import {signInOutErrors} from "../styles/server-messeges.module.css"

function ServerMessages(props) {
    const {messages} = props;

    if (messages.length) {
        return (
            <div>
                <h3>Server response</h3>
                {messages.length === 1
                    ? <p className={signInOutErrors}>{messages}</p>
                    : <ul>
                        {messages.map((message, i) => <li className={signInOutErrors} key={i}>{message}</li>)}
                    </ul>
                }
            </div>
        )
    } else {
        return (
            <p></p>
        )
    }

}

export default ServerMessages;
