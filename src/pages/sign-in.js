import * as React from "react";
import Layout from "../components/Layout";

const SignIn = () => {
    return (
        <Layout>
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
        </Layout>
    );
};

export default SignIn;
