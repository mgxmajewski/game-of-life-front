import React from 'react'
import Layout from "../components/Layout";
import Cell from '../components/Cell.js'
import {createStage} from "../utils/CreateGrid";

const cells = createStage()


const Grid = () => {
    return (
        <Layout>
            <div>
                {cells.map(row => row.map((cell, x) => <Cell key={x} type={cell[0]} />))}
            </div>
        </Layout>
    )
}

export default Grid
