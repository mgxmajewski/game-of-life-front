import React from "react"
import {navigate} from "gatsby";
import {handleLogin, isLoggedIn} from "../utils/LoginHandler"
import GenericUserForm from "../components/GenericUserForm";

class Login extends React.Component {
    state = {
        email: ``, password: ``, purpose: `Log In`
    }
    handleUpdate = event => {
        this.setState({
            [event.target.name]: event.target.value,
        })
    }

    handleSubmit = event => {
        event.preventDefault()
        handleLogin(this.state)
    }

    render() {
        if (isLoggedIn()) {
            navigate(`/grid`)
        }
        return (
            <GenericUserForm onSubmit={event => {
                this.handleSubmit(event)
            }} onChange={this.handleUpdate} purpose={this.state.purpose}/>
        )
    }
}

export default Login