import React from 'react';
import {handleLogout} from "../utils/LogoutHandler";
import {navigate} from "gatsby";
import {hellouser, links, loginOrOut, logo} from "../styles/navbar.module.css"
import {buttonNotChangingAppearance} from "../styles/global.module.css"


const NavBar = () => {

    const userName = typeof window !== "undefined"
        ? localStorage.getItem('userName')
        : null;
    const userLogged = userName !== null;

    return (
        <nav>
            <button className={`${logo} ${buttonNotChangingAppearance}`}
                    onClick={() => navigate('/')}
                >
                GameOfLife.live
            </button>
            <div className={links}>
                {userLogged ?
                    <>
                        <p className={`${hellouser}`}>Hi, {userName}!</p>
                        <button
                            className={`${loginOrOut} ${buttonNotChangingAppearance}`}
                            onClick={() => handleLogout()}
                        >
                            Sign Out
                        </button>
                    </>
                    :
                    <>
                        <button
                            className={`${loginOrOut} ${buttonNotChangingAppearance}`}
                            onClick={() => navigate('/sign-in')}
                        >
                            Login
                        </button>
                    </>
                }
            </div>
        </nav>
    );
};

export default NavBar;
