import * as PropTypes from "prop-types";
import React from "react";
import ServerMessages from "./ServerMessages";

const GenericUserForm = props => {


    const userWantsToSignIn = `Sign in`;
    const noAccountQuestion = `Don't have a user account? `
    const signUpSuggestion = ` to sign up!`
    const alreadyWithAccountQuestion = `Already have a user account? `
    const signInSuggestion = ` to sign in!`

    const purposeParagraph = (question, suggestedAction) => {

        return <p>
            {`${question}`}
            <strong style={{textDecorationLine: "underline"}}
                    onClick={props.onTogglePurpose}>
                Click here
            </strong>
            {`${suggestedAction}`}
        </p>
    }

    return (
        <div className="form--centered gradient-background-with-shadow">

            <h1>Get access</h1>
            <ServerMessages messages={props.messages}/>
            <form
                method="post"
                onSubmit={props.onSubmit}
            >
                <label>
                    Email
                    <input
                        type="text"
                        name="email"
                        onChange={props.onChange}
                    />
                </label>
                <label>
                    Password
                    <input
                        type="password"
                        name="password"
                        onChange={props.onChange}
                    />
                </label>
                <input
                    type="submit"
                    className="btn"
                    value={`${props.purpose}`}
                />
            </form>
            {props.purpose === userWantsToSignIn
                ? purposeParagraph(noAccountQuestion, signUpSuggestion)
                : purposeParagraph(alreadyWithAccountQuestion, signInSuggestion)
            }
        </div>
    )
}

GenericUserForm.propTypes = {
    onSubmit: PropTypes.func,
    onChange: PropTypes.func,
    purpose: PropTypes.string
};

export default GenericUserForm;
