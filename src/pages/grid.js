import React from 'react'
import Layout from "../components/Layout";
import AliveCell from '../components/AliveCell.js'
import DeadCell from '../components/DeadCell.js'
import {createStage} from "../utils/CreateGrid";
import {dummyState} from "../utils/DummyState";

const cells = createStage()


const Grid = () => {
    return (
        <Layout>
            <div>
                {dummyState.map((rows, x) => {
                    return (
                        <div key={x}>
                            {rows.map((cell, y) => {
                                const cellCoordinates = `${y.toString()},${x.toString()}`
                                return <div key={cellCoordinates}>{
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
