import * as React from "react";
import {Link} from "gatsby";
import Layout from "../components/Layout";
import {header, btn} from "../styles/home.module.css";

const IndexPage = () => {
    return (
        <Layout>
        <section className={header}>
            <div>
                <h2>Convay's Game of Life</h2>
                <h3>Discover Cellular Automata</h3>
                <p>You can watch already discovered patterns or try to find new ones yourself.</p>
                <Link className={btn} to="/grid">New Game</Link>
            </div>
        </section>
        </Layout>
    )
}

export default IndexPage
