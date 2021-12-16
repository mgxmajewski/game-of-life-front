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

    handleMessages = (event) => {
        this.setState({messages: [`${event}`]})
    }

    handleSubmit = async event => {
        event.preventDefault()
        if (this.state.purpose === `Log In`) {
            await handleLogin(this.state)
        } else if (this.state.purpose === `Sign In`) {
            this.handleMessages(await handleSignUp(this.state))
            this.handlePurposeToggle()
        }
    }

    render() {
        return (
            <>
                <GenericUserForm
                    messages={this.state.messages}
                    onSubmit={event => {this.handleSubmit(event)}}
                    onChange={this.handleUpdate}
                    purpose={this.state.purpose}
                    onTogglePurpose={this.handlePurposeToggle}
                />
            </>
        )
    }
}

export default Login