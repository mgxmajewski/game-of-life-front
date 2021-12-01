import React from "react"
import {navigate} from "gatsby";
import {handleLogin, isLoggedIn} from "../utils/LoginHandler"

class Login extends React.Component {
    state = {
        email: ``, password: ``,
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
            <>
                <h1>Log in</h1>
                <form
                    method="post"
                    onSubmit={event => {
                        this.handleSubmit(event)
                    }}
                >
                    <label>
                        email
                        <input type="text" name="email" onChange={this.handleUpdate}/>
                    </label>
                    <label>
                        Password
                        <input
                            type="password"
                            name="password"
                            onChange={this.handleUpdate}
                        />
                    </label>
                    <input type="submit" value="Log In"/>
                </form>
            </>
        )
    }
}

export default Login