import React from "react"
import {handleLogin, loadAndRedirectLoggedUser} from "../utils/LoginHandler"
import GenericUserForm from "../components/GenericUserForm";
import {handleSignUp} from "../utils/SignUpHandler";

class Login extends React.Component {
    state = {
        email: ``,
        password: ``,
        purpose: `Log In`,
        messages: []
    }

    getUserNameFromEmailState = () => this.state.email.split("@")[0]

    handlePurposeToggle = () => {
        this.setState({purpose: this.state.purpose === `Log In` ? `Sign In` : `Log In`})
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
        if (this.state.purpose === `Log In`) {

            const logInResponse = await handleLogin(this.state)

            if ('accessToken' in logInResponse) {
                const userNameFromEmail = this.getUserNameFromEmailState()
                loadAndRedirectLoggedUser(logInResponse, userNameFromEmail)
            } else {
                // Display server messages if auth was not successful.
                this.handleMessages(logInResponse)
            }



        } else if (this.state.purpose === `Sign In`) {

            const signUpResponse = await handleSignUp(this.state)
            this.handleMessages(signUpResponse)

            if (signUpResponse.messages[0] === 'Account successfully created') {

                // Leaving for now (it may be better to postpone redirect of new user)
                // this.handlePurposeToggle()
                const successfullyCreatedUser = await handleLogin(this.state)
                const userNameFromEmail = this.getUserNameFromEmailState()
                loadAndRedirectLoggedUser(successfullyCreatedUser, userNameFromEmail)
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