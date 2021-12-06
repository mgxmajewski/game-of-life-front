import React from 'react';
import PropTypes from "prop-types";
import {isLoggedIn} from "../utils/LoginHandler";
import {navigate} from "gatsby";


const AuthSync = (props) => {
            if (!isLoggedIn()) {
            navigate(`/sign-in`)
        }
    return (<>
        {props.children}
    </>
    );
};

// AuthSync.propTypes = {
//     children: PropTypes.node
// };

export default AuthSync;
