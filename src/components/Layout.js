import React from 'react';
import '../styles/normalize.css'
import {layout, content} from '../styles/global.module.css'
import NavBar from "./NavBar";
import PropTypes from "prop-types";
import '../styles/layout.css'

const Layout = ({children}) => {
    return (
        <div className={layout}>
            <NavBar/>
            <div className={content}>
                {/*content for each page*/}
                {children}
            </div>
            <footer>
                <p>Copyrights 2021 agileCat.io</p>
            </footer>
        </div>
    );
};

Layout.propTypes = {
    children: PropTypes.node
};

export default Layout;
