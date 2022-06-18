import * as React from "react";
import {Link} from "gatsby";
import {
    embeddedVideoContainer,
    header,
    headerButton,
    leadCopyParagraph,
    mainCopyParagraph
} from "../styles/home.module.css";
import {
    genericButton,
    simpleSeparator,
    tabSeparator,
    tabSeparator__line,
    tabSeparator__tab,
    tabSeparatorHigher,
    tabSeparatorMediumHigher
} from "../styles/global.module.css";
import YoutubeEmbed from "../components/YoutubeEmbed";


const IndexPage = () => {
    return (<>
            <section className={`${header}`}>
                <h2>Conway&apos;s Game of Life</h2>
                <h3>Discover the famous cellular automaton</h3>
                <Link
                    className={`${genericButton} ${headerButton}`}
                    to="/grid">
                    Setup your own Game of Life
                </Link>
            </section>
            <section>
                <div className={`${simpleSeparator} ${tabSeparatorHigher}`}></div>
                <p className={leadCopyParagraph}>
                    TL;DR If you have never heard about cellular automata, don't worry!
                    You can click the button above and tinker with the game of life without any knowledge. Curious? Read
                    more below.
                </p>
                <div className={simpleSeparator}></div>
                <div className={`${tabSeparator} ${tabSeparatorMediumHigher}`}>
                    <div className={tabSeparator__tab}>cellular automata</div>
                    <div className={tabSeparator__line}></div>
                </div>
                <p className={mainCopyParagraph}>
                    There is an alternative name for cellular automata, iterative arrays which gives more intuition
                    about
                    what it is. A most basic simplified explanation would be that it is a set of rules describing how
                    cells
                    of a 2-dimensional grid change their state in time (more precisely discrete iterations). There are
                    many
                    types of cellular automaton and Conway's Game of Life is one of them but the whole concept was
                    originally discovered in the 1940s by Stanisław Ulam and John von Neumann (Manhattan Project).
                    Another
                    famous cellular automaton is Rule 30.
                    More on the topic you can find in Stephen Wolfram's (creator of Wolfram Mathematica) book
                    <a
                        href="https://www.wolframscience.com/nks/"
                        target="_blank" rel="noreferrer"
                        style={{textDecoration: "none"}}>
                        &nbsp;A New Kind of Science&nbsp;
                    </a>
                    or interview with hum by Lex Fridman(
                    <a href="https://www.youtube.com/watch?v=VguG_y05Xe8"
                       target="_blank" rel="noreferrer"
                       style={{textDecoration: "none"}}>
                        link to the interview
                    </a>
                    ).
                </p>
                <div className={simpleSeparator}></div>
                <div className={`${tabSeparator} ${tabSeparatorMediumHigher}`}>
                    <div className={tabSeparator__tab}>game of life</div>
                    <div className={tabSeparator__line}></div>
                </div>
                <p className={mainCopyParagraph}>
                    Back to Conway's Game of Life. It is a relatively simple set of rules.
                    First of all, cells can be either dead or alive and their behavior over time is:
                    <ol>
                        <li>Any live cell with two or three live neighbors survives.</li>
                        <li>Any dead cell with three live neighbors becomes a live cell.</li>
                        <li>All other live cells die in the next generation. Similarly, all other dead cells stay
                            dead.
                        </li>
                    </ol>
                    That's all. Once you set up the initial state of the grid the rest is a matter of the iterating
                    changes
                    according to the rules. After the start, some really interesting things start to happen. Some of the
                    <div className={embeddedVideoContainer}><YoutubeEmbed embedId={`HeQX2HjkcNo?start=62`}/></div>
                    initial states die soon, but others keep generating themselves indefinitely or they get into an
                    oscillation state, eventually, the pattern gets chaotic. Despite the simplicity of the rules, the
                    result of the game is undecidable. There is no way to predict the behavior of the grid other than
                    running
                    it over time which is pretty significant keeping in mind that we can predict so many much more
                    complex
                    systems existing in nature. This has really deep mathematical meaning and is described in the
                    attached video. I highly recommend watching the whole episode, but the link includes a time mark to
                    fragment
                    about the game of life.
                </p>

                <p className={mainCopyParagraph}>
                    Another interesting video is an interview with John Conway, an English mathematician who invented
                    the
                    Game of Life (
                    <a
                        href="https://www.youtube.com/watch?v=R9Plq-D1gEk"
                        target="_blank"
                        rel="noreferrer"
                        style={{textDecoration: "none"}}
                    >
                        link to the interview
                    </a>
                    ).
                </p>
            </section>
        </>
    )
}

export default IndexPage
