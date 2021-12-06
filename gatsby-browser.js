import React from 'react';
import Layout from "./src/components/Layout";
import AuthSync from "./src/components/AuthSync";
export { wrapRootElement } from './src/apollo/wrap-root-element';

export const wrapPageElement = ({ element, props }) => {
    return <Layout {...props}>
        <AuthSync>{element}</AuthSync>
    </Layout>;
};
