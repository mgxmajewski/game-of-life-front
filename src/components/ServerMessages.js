import React from 'react';

function ServerMessages(props) {
    const {messages} = props;

    if (messages.length) {
        return (
            <div>
                <h3>Server response</h3>
                {messages.length === 1
                    ? <p>{messages}</p>
                    : <ul>
                        {messages.map((message, i) => <li key={i}>{message}</li>)}
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
