import React from 'react';
import '../styles/global.css'
import NavBar from "./NavBar";

const Layout = ({children}) => {
    return (
        <div className='layout'>
            <NavBar/>
            <div className ="content">
                {/*content for each page*/}
                {children}
            </div>
            <footer>
                <p>Copyrights 2021 agileCat.io</p>
            </footer>
        </div>
    );
};

export default Layout;
