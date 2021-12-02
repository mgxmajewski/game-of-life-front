import * as PropTypes from "prop-types";
import React from "react";

const GenericUserForm = props => <div className="form--centered">
    <h1>Get access</h1>
    <form
        method="post"
        onSubmit={props.onSubmit}
    >
        <label>
            Email
            <input type="text" name="email" onChange={props.onChange}/>
        </label>
        <label>
            Password
            <input
                type="password"
                name="password"
                onChange={props.onChange}
            />
        </label>
        <input type="submit" className="btn" value={`${props.purpose}`}/>
    </form>
        {props.purpose === `Log In`
            ? <p>Don't have a user account? <strong style={{textDecorationLine: "underline"}} onClick={props.onTogglePurpose}>Click here</strong> to sign up!</p>
            : <p>Already have a user account? <strong style={{textDecorationLine: "underline"}} onClick={props.onTogglePurpose}>Click here</strong> to sign in!</p>
        }
</div>;

GenericUserForm.propTypes = {
    onSubmit: PropTypes.func,
    onChange: PropTypes.func,
    purpose: PropTypes.string
};

export default GenericUserForm;
