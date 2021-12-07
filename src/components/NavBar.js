import React from 'react';
import {Link} from "gatsby";
import {handleLogout} from "../utils/LogoutHandler";


const NavBar = () => {

const userName = typeof window !== "undefined"
    ? localStorage.getItem('userName')
    : null;
const userLogged = userName !== null;

    return (
        <nav>
            <h1>AgileCat.io</h1>
            <div className="links">
                {/*<Link to="/">Home</Link>*/}
                {/*<Link to="/grid">Grid</Link>*/}
                {userLogged ?
                    <React.Fragment>
                        <p className="hellouser">Hi, {userName}!</p>
                        <p className="signout" onClick={() => handleLogout()}>Sign Out</p>
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
