import React from 'react';
import {Link} from "gatsby";
import {userMailNameVar} from "../utils/cache";

const userName = localStorage.getItem('userName');
const userLogged = userName !== null;

const NavBar = () => {
    // console.log(`userMailNameVar(): ` + userMailNameVar().length);
    return (
        <nav>
            <h1>AgileCat.io</h1>
            <div className="links">
                {/*<Link to="/">Home</Link>*/}
                {/*<Link to="/grid">Grid</Link>*/}
                {userLogged ?
                    <React.Fragment>
                        <p className="hellouser">Hi, {userName}!</p>
                        <Link className="signout" to="/">Sign Out</Link>
                    </React.Fragment>
                    :
                    <React.Fragment>
                        <Link to="/sign-in">Login</Link>
                    </React.Fragment>
                }
            </div>
        </nav>
    );
};

export default NavBar;
