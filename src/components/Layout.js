import React from 'react';

const Layout = ({children}) => {
    return (
        <div className='layout'>
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
