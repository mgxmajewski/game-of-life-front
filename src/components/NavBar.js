import React from 'react';
import {Link} from "gatsby";

const NavBar = () => {
    return (
        <nav>
            <h1>Game of life</h1>
            <div className="links">
                <Link to="/">Home</Link>
                <Link to="/grid">Grid</Link>
            </div>
        </nav>
    );
};

export default NavBar;
