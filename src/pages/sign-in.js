import React from "react"
import {navigate} from "gatsby";
import {handleLogin, isLoggedIn} from "../utils/LoginHandler"
import GenericUserForm from "../components/GenericUserForm";
import {handleSignUp} from "../utils/SignUpHandler";

class Login extends React.Component {
    state = {
        email: ``, password: ``, purpose: `Log In`
    }

    handlePurposeToggle = () => {
        this.setState({purpose: this.state.purpose === `Log In` ? `Sign In` : `Log In`})
    }

    handleUpdate = event => {
        this.setState({
            [event.target.name]: event.target.value,
        })
    }

    handleSubmit = event => {
        event.preventDefault()
        if (this.state.purpose === `Log In`){
            handleLogin(this.state)
        } else if (this.state.purpose === `Sign In`) {
            handleSignUp(this.state)
            this.handlePurposeToggle()
        }
    }

    render() {
        return (
            <GenericUserForm onSubmit={event => {
                this.handleSubmit(event)
            }} onChange={this.handleUpdate} purpose={this.state.purpose} onTogglePurpose={this.handlePurposeToggle}/>
        )
    }
}

export default Login