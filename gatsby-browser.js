import React from 'react';
import Layout from "./src/components/Layout";
export { wrapRootElement } from './src/apollo/wrap-root-element';

export const wrapPageElement = ({ element, props }) => {
    return <Layout {...props}>
        {element}
    </Layout>;
};
