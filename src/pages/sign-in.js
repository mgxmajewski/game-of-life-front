import React from "react"
import {handleSignIn, loadAndRedirectSignedInUser} from "../utils/LoginHandler"
import GenericUserForm from "../components/GenericUserForm";
import {handleRegistration} from "../utils/SignUpHandler";

const createAccount = `Create account`;
const signIn = `Sign in`;

class Login extends React.Component {
    state = {
        email: ``,
        password: ``,
        purpose: signIn,
        messages: []
    }

    getUserNameFromEmailState = () => this.state.email.split("@")[0]

    handlePurposeToggle = () => {
        this.setState({purpose: this.state.purpose === signIn ? createAccount : signIn})
    }

    handleUpdate = event => {
        this.setState({
            [event.target.name]: event.target.value,
        })
    }

    handleMessages = (responseMessage) => {
        this.setState({messages: responseMessage.messages})
    }

    handleSubmit = async event => {

        event.preventDefault()

        const userWantsToSignIn = this.state.purpose === signIn;
        const userWantsToCreateAccount = this.state.purpose === createAccount;

        if (userWantsToSignIn) {

            const logInResponse = await handleSignIn(this.state)
            const thereWasTokenInResponse = 'accessToken' in logInResponse

            if (thereWasTokenInResponse) {

                const userNameFromEmail = this.getUserNameFromEmailState()
                loadAndRedirectSignedInUser(logInResponse, userNameFromEmail)
            } else {

                // Display server messages if auth was not successful.
                this.handleMessages(logInResponse)
            }

        } else if (userWantsToCreateAccount) {

            const registrationResponse = await handleRegistration(this.state)

            this.handleMessages(registrationResponse)

            const wasSuccessfulRegistration = (response) =>
                response.messages[0] === 'Account successfully created'

            if (wasSuccessfulRegistration(registrationResponse)) {

                // Leaving for now (it may be better to postpone redirect of new user)
                // this.handlePurposeToggle()
                const successfullyCreatedUser = await handleSignIn(this.state)
                const userNameFromEmail = this.getUserNameFromEmailState()
                loadAndRedirectSignedInUser(successfullyCreatedUser, userNameFromEmail)
            }
        }
    }

    render() {
        return (
            <>
                <GenericUserForm
                    messages={this.state.messages}
                    onSubmit={event => {
                        this.handleSubmit(event)
                    }}
                    onChange={this.handleUpdate}
                    purpose={this.state.purpose}
                    onTogglePurpose={this.handlePurposeToggle}
                />
            </>
        )
    }
}

export default Login