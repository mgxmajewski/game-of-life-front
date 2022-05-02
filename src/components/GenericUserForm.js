import * as PropTypes from "prop-types";
import React from "react";
import ServerMessages from "./ServerMessages";
import {genericForm, genericFormButton} from "../styles/generic-user-form.module.css"
import {genericButton, gradientBackgroundWithShadow, buttonNotChangingAppearance} from "../styles/global.module.css"

const GenericUserForm = props => {


    const userWantsToSignIn = `Sign in`;
    const noAccountQuestion = `Don't have a user account? `
    const signUpSuggestion = ` to sign up!`
    const alreadyWithAccountQuestion = `Already have a user account? `
    const signInSuggestion = ` to sign in!`

    const purposeParagraph = (question, suggestedAction) => {

        return <p>
            {`${question}`}
            <button className={buttonNotChangingAppearance} style={{textDecorationLine: "underline"}}
                    onClick={props.onTogglePurpose}>
                Click here
            </button>
            {`${suggestedAction}`}
        </p>
    }

    return (
        <div className={`${genericForm} ${gradientBackgroundWithShadow}`}>
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
                <button
                    type="submit"
                    className={`${genericButton} ${genericFormButton}`}
                    // value={`${props.purpose}`}
                >{props.purpose}</button>
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
