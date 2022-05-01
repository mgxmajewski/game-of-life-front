import React from 'react';
// import {Link} from "gatsby";
import {handleLogout} from "../utils/LogoutHandler";
import {navigate} from "gatsby";
import {hellouser, links, loginOrOut, logo} from "../styles/navbar.module.css"


const NavBar = () => {

    const userName = typeof window !== "undefined"
        ? localStorage.getItem('userName')
        : null;
    const userLogged = userName !== null;

    return (
        <nav>
            <h1
                className={logo}
                onClick={() => navigate('/')}
            >
                AgileCat.io
            </h1>
            <div className={links}>
                {/*<Link to="/">Home</Link>*/}
                {/*<Link to="/grid">Grid</Link>*/}
                {userLogged ?
                    <>
                        <p className={hellouser}>Hi, {userName}!</p>
                        <p
                            className={loginOrOut}
                            onClick={() => handleLogout()}
                        >
                            Sign Out
                        </p>
                    </>
                    :
                    <>
                        <p
                            className={loginOrOut}
                            onClick={() => navigate('/sign-in')}
                        >
                            Login
                        </p>
                    </>
                }
            </div>
        </nav>
    );
};

export default NavBar;
