import * as React from "react";
import {Link} from "gatsby";
import {header, copyParagraph} from "../styles/home.module.css";
import {btn} from "../styles/global.css";


const IndexPage = () => {
    return (
        <section className={header}>
            <div>
                <h2>Conway&apos;s Game of Life</h2>
                <h3>Discover Cellular Automata</h3>
                <p className={copyParagraph}>You can watch already discovered patterns or try to find new ones yourself.</p>
                <Link className="btn" to="/grid">New Game</Link>
            </div>
        </section>
    )
}

export default IndexPage
