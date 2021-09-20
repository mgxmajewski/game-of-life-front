import * as React from "react";

const SignIn = () => {
    return (
            <React.Fragment>
                <input
                    id="emailAddress"
                    name="emailAddress"
                    type="text"
                    placeholder=" email address"/>
                <input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="password"/>
            </React.Fragment>
    );
};

export default SignIn;
