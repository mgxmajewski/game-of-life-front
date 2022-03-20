import {navigate} from "gatsby";

const fetch = require(`node-fetch`)

export const handleRegistration = (props) => {

    const {email, password} = props
    const userNameFromEmail = email.split("@")[0]
    // const authHeader = 'Basic ' + btoa(`${email}:${password}`)
    // console.log(authHeader)

    const myHeaders = {
        "Content-Type": "application/json"
    };

    const raw = JSON.stringify({
        "userName": userNameFromEmail,
        "emailAddress": email,
        "password": password
    });

    const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow',
        credentials: 'include'
    };

    return fetch(`${process.env.GATSBY_API_URL}/user/create`, requestOptions)
        .then(response => response.json())
        // .then((response)=> console.log(response))
        // .then((response)=> messageHandler(JSON.stringify(response)))
        // .then(() => navigate(`/grid`))
        .catch(error => console.log('error', error));
}