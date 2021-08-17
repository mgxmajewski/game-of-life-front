import * as React from "react";
import {Link} from "gatsby";
import Layout from "../components/Layout";
import {header, btn} from "../styles/home.module.css";
import CanvasGrid from "../components/CanvasGrid";

const CanvasGridPage = () => {
    return (
        <Layout>
            <div>
                <CanvasGrid/>
            </div>
        </Layout>
    )
}

export default CanvasGridPage
