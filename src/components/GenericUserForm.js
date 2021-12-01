import * as PropTypes from "prop-types";
import React from "react";

const GenericUserForm = props => <>
    <h1>Log in</h1>
    <form
        method="post"
        onSubmit={props.onSubmit}
    >
        <label>
            email
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
        <input type="submit" value={`${props.purpose}`}/>
    </form>
</>;

GenericUserForm.propTypes = {
    onSubmit: PropTypes.func,
    onChange: PropTypes.func,
    purpose: PropTypes.string
};

export default GenericUserForm;
