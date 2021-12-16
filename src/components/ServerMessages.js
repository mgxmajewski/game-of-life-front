import React from 'react';

function ServerMessages(props) {
    let messages = props.messages;

    if (messages.length) {
        return (
            <div>
                <h3>Server response</h3>
                <ul>
                    {messages.map((error, i) => <li key={i}>{error}</li>)}
                </ul>
            </div>
        )
    } else {
        return (
            <p></p>
        )
    }

}

export default ServerMessages;
