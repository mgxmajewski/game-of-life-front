import React from "react"
import {handleLogin} from "../utils/LoginHandler"
import GenericUserForm from "../components/GenericUserForm";
import {handleSignUp} from "../utils/SignUpHandler";

class Login extends React.Component {
    state = {
        email: ``,
        password: ``,
        purpose: `Log In`,
        messages: []
    }

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

            await handleLogin(this.state)
        } else if (this.state.purpose === `Sign In`) {

            const signUpResponse = await handleSignUp(this.state)
            this.handleMessages(signUpResponse)
            if (signUpResponse === 'Account successfully created') {

                await handleLogin(this.state)
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