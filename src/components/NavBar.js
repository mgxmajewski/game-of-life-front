import React from 'react';
import {Link} from "gatsby";
import {userMailNameVar} from "../utils/cache";

const NavBar = () => {
    console.log(`userMailNameVar(): ` + userMailNameVar().length);
    const userLogged = userMailNameVar().length !== 0;
    return (
        <nav>
            <h1>AgileCat.io</h1>
            <div className="links">
                {/*<Link to="/">Home</Link>*/}
                {/*<Link to="/grid">Grid</Link>*/}
                {userLogged ?
                    <React.Fragment>
                        <p className="hellouser">Hi, {userMailNameVar()}!</p>
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
