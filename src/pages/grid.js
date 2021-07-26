import React from 'react'
import Layout from "../components/Layout";
import {row, cellGrid} from "../styles/grid.module.css"
import AliveCell from '../components/AliveCell.js'
import DeadCell from '../components/DeadCell.js'
import {gql, useSubscription} from "@apollo/client";

const GET_STATE = gql`
    subscription {
        states{
            id
            grid
        }
    }
`;

const Grid = () => {
    const { data } = useSubscription(GET_STATE);
    if (!data) {
        return null;
    }
    const state = data.states[data.states.length-1].grid
    return (
        <Layout>
            <div>
                {state.map((rows, x) => {
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
