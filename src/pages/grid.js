import React from 'react'
import Layout from "../components/Layout";
import {row, cellGrid} from "../styles/grid.module.css"
import AliveCell from '../components/AliveCell.js'
import DeadCell from '../components/DeadCell.js'
import {dummyState} from "../utils/DummyState";


const Grid = () => {
    return (
        <Layout>
            <div>
                {dummyState.map((rows, x) => {
                    console.log(rows)
                    return (
                        <div key={x} className={row}>
                            {rows.map((cell, y) => {
                                const cellCoordinates = `${y.toString()},${x.toString()}`
                                return <div className={cellGrid} key={cellCoordinates}>{
                                    (cell === "#")
                                        ? <AliveCell />
                                        : <DeadCell/>
                                }</div> ;
                            })}
                        </div>
                    );
                })}
            </div>
        </Layout>
    )
}

export default Grid
