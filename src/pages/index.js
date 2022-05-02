import * as React from "react";
import {Link} from "gatsby";
import {header, copyParagraph} from "../styles/home.module.css";
import {genericButton} from "../styles/global.module.css";
import YoutubeEmbed from "../components/YoutubeEmbed";


const IndexPage = () => {
    return (
        <section className={header}>
            <div>
                <h2>Conway&apos;s Game of Life</h2>
                <h3>Discover Cellular Automata</h3>
                <p className={copyParagraph}>You can watch already discovered patterns or try to find new ones yourself.</p>
                <Link className={genericButton} to="/grid">New Game</Link>
                <YoutubeEmbed embedId={`HeQX2HjkcNo?start=62`}/>
            </div>
        </section>
    )
}

export default IndexPage
