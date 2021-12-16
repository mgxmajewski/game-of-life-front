import {navigate} from "gatsby";

const fetch = require(`node-fetch`)

export const handleSignUp = (props) => {

    const {email, password} = props
    // const userNameFromEmail = email.split("@")[0]
    const authHeader = 'Basic ' + btoa(`${email}:${password}`)
    console.log(authHeader)

    const myHeaders = {
        "Content-Type": "application/json"
    };

    const raw = JSON.stringify({
        "userName": "userNew",
        "emailAddress": email,
        "password": password
    });

    const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        // redirect: 'follow',
        // credentials: 'include'
    };

    fetch("http://localhost:3000/user/create", requestOptions)
        .then(response => response.text())
        .then((response)=> console.log(response))
        // .then(() => navigate(`/grid`))
        .catch(error => console.log('error', error));
}