import React from 'react';
import {Link} from "gatsby";

const NavBar = () => {
    return (
        <nav>
            <h1>AgileCat.io</h1>
            <div className="links">
                <Link to="/">Home</Link>
                <Link to="/grid">Grid</Link>
                <Link to="/sign-in">Login</Link>
            </div>
        </nav>
    );
};

export default NavBar;
